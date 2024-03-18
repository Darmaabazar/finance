// 
var uiController = (function() {
    return {
        publicAdd: function(a) {
            a = add(a);
            console.log("efyds" + a);
        }
    }
})();

var financeController = (function() {

})();

var appController = (function(uiController, financeController) {

})(uiController, financeController);