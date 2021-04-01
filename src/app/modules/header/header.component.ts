import { Component, OnInit } from '@angular/core';
import { Path } from '../../config.js';
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  path: String = Path.url;
  categories: Object = null;
  arrayTitleList: Array<any> = [];
  render: Boolean = true;

  constructor(private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoriesService) { }

  ngOnInit(): void {
    /* toammos categorias */
    this.categoriesService.getData()
      .subscribe(resp => {

        this.categories = resp;

        /* recorremos apra la lista de titulos */

        let i;

        for (i in resp) {
          this.arrayTitleList.push(JSON.parse(resp[i].title_list));
          /* console.log(this.arrayTitleList); */
        }

      })
  }

  /* funcion de fin del renderisado */
  callback() {

    if (this.render) {

      this.render = false;
      let arraySubCategories = [];
      /* console.log(this.render); */

      this.arrayTitleList.forEach(titleList => {

        /* separar los titulos */

       for(let i =0;i<titleList.length;i++) {

          /* tomamos la coleccion de filtrado de subcategoria */

          /*         console.log("titlelist", titleList[i]);
           */
          this.subCategoriesService.getFilterData("title_list", titleList[i])
            .subscribe(resp => {
              
              arraySubCategories.push(resp);
              
              /* hacemos un recorrido por la coleccion general de subcategorias */

              let f;
              let g;
              let arrayTitleName=[];

              for(f in arraySubCategories){
                /* hacemos un recorrido por la coleccion partucular de subcategorias */
                for(g in arraySubCategories[f]){
                    /* creamos un numero nuevo array de objeto clasificando cada categoria cpon la respectiva lista de titulo */
                    arrayTitleName.push({
                      "titleList":arraySubCategories[f][g].title_list,
                      "subcategory":arraySubCategories[f][g].name,
                      "url":arraySubCategories[f][g].url
                    })
                }      
              }
              /* reocrremos el array de objetos nuevos para biscvar condidencia co la lisya de titulos que coincidan */
              for(f in arrayTitleName){
                if (titleList[i]==arrayTitleName[f].titleList) {
                  /* imprimir el listado correspondiente */
                  $(`[titleList='${titleList[i]}']`).append(
                    `
                      <li>
                        <a href="products/${arrayTitleName[f].url}">${arrayTitleName[f].subcategory}</a>
                      </li>
                    `)
                }
              }
            })
        }

      })
    }
  }
}
