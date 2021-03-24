//1\ get button
//2.add event for button
//3.get input content how?
//用parentElement---children---children[0]
//getAtrribute?  children[0].value

//将获得的content放入新建的input中：create item在section里

//图标作为button
//1.create button element
//2. add class
//3. innerHTML= icon网站里面的html，需要先导入html文件link

//添加一个从小变大的动画
//css中添加动画函数 加到click事件中 

//i{
//    PointerEvent:none;  避免按到i标签
//}

//点击对勾透明度改变  再次点击会恢复 
//addclass----toggle!!! 然后对class进行css设定

//按下红色trash button删除掉任务
//找到parent element用remove
//为这个点击加动画 从大到小
//加event animationed---再remove


//final:进一步修改:按下add into list之后input清空: if+ 赋值空字符串

//storage：存入localstorage +下次打开数据还在








//正式程序：

//功能实现一：点击add into list后在下方添加编辑后的内容
let section=document.querySelector("section");  //不能直接用section
let addButton=document.querySelector("form button"); 

addButton.addEventListener("click",e=>{
    e.preventDefault();//e代表的是event
    //1.get values
    let form=e.target.parentElement;//问：为啥要加上target呢?回答：e.target才代指addButton e指代event本身
    // console.log(form);
    let todoText=form.children[0].value; //getAtrrbute的区别和用法？
    let todoMonth=form.children[1].value;
    let todoDay=form.children[2].value;
    // console.log(todoText,todoMonth,todoDay);test
    //5. 为input text添加约束
    if(form.children[0].value==""){
        alert("请输入代办事项");
        return;  //从callback function中跳出
    }

    //2. create a todo div and append it to section
    let todo=document.createElement("div");
    todo.classList.add("todo");
    let text=document.createElement("p");
    text.classList.add("todo-text");
    text.innerText=todoText;
    let time=document.createElement("p");
    time.classList.add("todo-time");
    time.innerText=todoMonth+" / "+todoDay;
    //append into todo
    todo.appendChild(text); //不加引号
    todo.appendChild(time);
   
    //添加两个icon：completeButton
    let completeButton=document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML='<i class="fas fa-check"></i>';
    //为completeButton添加事件 实现点击后透明度改变  避免i标签和button标签的click误差:SCSS前面加入pointer-events:none;
    completeButton.addEventListener("click", (e)=>{
        // todo.classList.toggle("done");
        //correct 问：为什么上面的不好
        let todoItem=e.target.parentElement;
        todoItem.classList.toggle("done");
    })

    //trashButton
    let trashButton=document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    //为trashButton添加事件 实现1.点击后从大到小消失 2.上面的上移动 remove
    trashButton.addEventListener("click",e=>{
        let todoItem=e.target.parentElement;
        todoItem.style="animation:scaleDown 0.3s forwards";
        todoItem.addEventListener("animationend",()=>{
            //remove from localstorage
            let text=todoItem.children[0].innerText;
            let myListArray=JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item,index)=>{
                if(item.todoText==text){
                    myListArray.splice(index,1);
                    localStorage.setItem("list",JSON.stringify(myListArray));
                }
            })
            todoItem.remove();
        })   
    })

    //append button into div.todo
    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    //3.为点击添加从小到大的动画 
    todo.style.animation="scaleUp 0.3s forwards";
    //4.为两个button添加从小到大、从大到小+删除的动画 在上面button


    //create an object
    let myTodo={
        todoText:todoText,
        todoMonth:todoMonth,
        todoDay:todoDay
    };

    //last:   store data into array of objects
    let myList=localStorage.getItem("list");
    if(myList==null){
    localStorage.setItem("list",JSON.stringify([myTodo])); //这里加[]不能省略！！这是把todo作为一个array item!!!
    }else{
        let myListArray=JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list",JSON.stringify(myListArray));
    }

    // console.log(JSON.parse(localStorage.getItem("list")));

    //clear the input text
    form.children[0].value="";
    form.children[1].value="";
    form.children[2].value="";
    //将div todoappend到section里
    section.appendChild(todo);

})

loadDate();//要先执行一次？


//load data from local storage  有一个问题：再次打开后上次打勾的任务会变成普通的待办，没有透明度等：自己解决 要储存在localstorage里面
function loadDate(){
    let myList=localStorage.getItem("list");
    if(myList!==null){
        let myListArray=JSON.parse(myList);
        myListArray.forEach(item=>{
            //create a todo
            let todo=document.createElement("div");
            todo.classList.add("todo");
            let text=document.createElement("p");
            text.classList.add("todo-text");
            text.innerText=item.todoText;  //item这里是个object
            let time=document.createElement("p");
            time.classList.add("todo-time");
            time.innerText=item.todoMonth+" / "+item.todoDay;
            //append into todo
            todo.appendChild(text); //不加引号
            todo.appendChild(time);

            //添加两个icon：completeButton
            let completeButton=document.createElement("button");
            completeButton.classList.add("complete");
            completeButton.innerHTML='<i class="fas fa-check"></i>';
            //为completeButton添加事件 实现点击后透明度改变  避免i标签和button标签的click误差:SCSS前面加入pointer-events:none;
            completeButton.addEventListener("click", (e)=>{
                // todo.classList.toggle("done");
                //correct 问：为什么上面的不好
                let todoItem=e.target.parentElement;
                todoItem.classList.toggle("done");
            })

            //trashButton
            let trashButton=document.createElement("button");
            trashButton.classList.add("trash");
            trashButton.innerHTML='<i class="fas fa-trash"></i>';
            //为trashButton添加事件 实现1.点击后从大到小消失 2.上面的上移动 remove
            trashButton.addEventListener("click",e=>{
                let todoItem=e.target.parentElement;
                todoItem.style="animation:scaleDown 0.3s forwards";
                todoItem.addEventListener("animationend",()=>{
                        //remove from localstorage
                    let text=todoItem.children[0].innerText;
                    let myListArray=JSON.parse(localStorage.getItem("list"));
                    myListArray.forEach((item,index)=>{
                        if(item.todoText==text){
                            myListArray.splice(index,1);
                            localStorage.setItem("list",JSON.stringify(myListArray));
                        }
                    })
                        todoItem.remove();
                })  
            })

            //append button into div.todo
            todo.appendChild(completeButton);
            todo.appendChild(trashButton);

            section.appendChild(todo);
        })
    }
}

//排序算法
function mergeTime(arr1,arr2){
    let result=[];
    let j=0;
    let i=0;

    while(i<arr1.length&&j<arr2.length){
        if(Number(arr1[i].todoMonth)>Number(arr2[j].todoMonth)){   //要记得转换为number
            result.push(arr2[j]);
            j++;
        }else if(Number(arr1[i].todoMonth)<Number(arr2[j].todoMonth)){
            result.push(arr1[i]);
            i++;

        }else if(Number(arr1[i].todoMonth)==Number(arr2[j].todoMonth)){
            if(Number(arr1[i].todoDay)>Number(arr2[j].todoDay)){
                result.push(arr2[j]);
                j++
            }else{
                result.push(arr1[i]);
                i++;
            }
        }
    }       
    while(i<arr1.length){
        result.push(arr1[i]);
        i++
    }
    while(j<arr2.length){
        result.push(arr2[j]);
        j++
    }
    return result;
}

function mergeSort(arr){
    if(arr.length===1){
        return arr;
    }else{
        let middle=Math.floor(arr.length/2);
        let right=arr.slice(0,middle);
        let left=arr.slice(middle,arr.length);
        return mergeTime(mergeSort(right),mergeSort(left));  //
    }
}

//test
// console.log(mergeSort(JSON.parse(localStorage.getItem("list"))));

//通过sort byTime 按钮来排序

let sortButton=document.querySelector("div.sort button");
sortButton.addEventListener("click",()=>{
    //sort data
    let sortedArray=mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list",JSON.stringify(sortedArray));
    //remove data
    let len=section.children.length;//children返回的是html collection ，length即为个数
    // console.log(len);
    for(let i=0;i<len;i++){ //HTML collection不能用foreach函数
        section.children[0].remove();//问：为啥是children[0],而不是children[i]?
    }

    //load data
    loadDate();
})