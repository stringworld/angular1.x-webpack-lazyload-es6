import uirouter from 'angular-ui-router';
import routing from './page1.route';

export default angular.module('app.page1', [uirouter])
    .config(routing)
    .controller('test1', function () {



        //obejct.asign demon
        const obj = [{ a: 1 }, { a: 1 }]
        let copy = Object.assign([], obj);
        console.log(copy)



        //map demon
        let copy1 = copy.map((element) => {
            return { a: element.a + 1 }
        })
        console.log(copy1)



        //filter demon
        let copy2=copy.filter((element, index, arr) => {
             return element.a=== 1
            //return arr.indexOf(element) === index
        }
        )
        console.log(copy2)

        

        //reduce demon
        let copy3=copy.reduce((pre,element)=>{
            return pre+element.a
        },0)
        console.log(copy3)


    })
    .controller('test2', ['$scope', function ($scope) {

    }])
    .name;