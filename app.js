// 
var uiController = (function() {
    
})();

var financeController = (function() {

})();

var appController = (function(uiController, financeController) {
    var ctrlAddItems = function(){
        console.log("event");
    }
    document.querySelector(".add__btn").addEventListener("click", function(){
        ctrlAddItems();
    })
    document.addEventListener("keypress", function(event){
        if(event.keyCode === 13) {
            ctrlAddItems();
        }
    })

})(uiController, financeController);