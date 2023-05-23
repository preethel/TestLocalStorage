var data = [
    "John",
    "Emily",
    "Michael",
    "Sophia",
    "Daniel",
    "Olivia",
    "Matthew",
    "Emma",
    "Andrew",
    "Ava",
    "William",
    "Isabella",
    "James",
    "Mia",
    "Joseph",
    "Abigail",
    "David",
    "Charlotte",
    "Benjamin",
    "Harper",
    // ... and so on, adding more names up to 100
  ];
pagination(1,10,100);
function pagination(currentPage, elementToShow, totalElement){
    var tempNumber = currentPage - 1;
    var totalPage = totalElement / elementToShow ;
    var startElement = tempNumber * totalElement ;
    var endElement = startElement + elementToShow;

    for(let i = startElement; i <= endElement; i++){
        console.log(data[i]);
    }
    var userButton = document.getElementById("myLi");
    userButton.innerHTML = "";
    function buttonGenerator(){
        var prevButton = document.createElement("a");
        prevButton.textContent = "<<";
        userButton.appendChild(prevButton);
        for(let i=currentPage; i <= totalPage ; i++){
            
            var button = document.createElement("a");
            button.textContent = i.toString();
            userButton.appendChild(button);
        }
        var nextButton = document.createElement("a");
        nextButton.textContent = ">>";
        userButton.appendChild(prevButton);
    }

    pageNumber = buttonGenerator();
    // var buttonListen = prompt("Please enter PageNumber", "1,2,3");
    // pagination(pageNumber, elementToShow, totalElement);
}