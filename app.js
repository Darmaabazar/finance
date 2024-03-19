// 
var uiController = (function() {
    var DOMStrings = {
        add__type: ".add__type",
        add__description: ".add__description",
        add__value: ".add__value",
        add__btn: ".add__btn"
    };
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.add__type).value,
                description: document.querySelector(DOMStrings.add__description).value,
                value: document.querySelector(DOMStrings.add__value).value

            };
        },

        getDOM: function(){
            return DOMStrings;
        }
    };
})();

var financeController = (function() {
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        items: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        }
    };

    return {
        addItem: function(type, desc, val) {
            var item, id;

            if(data.items[type].length === 0) id = 1;
            else {
                id = data.items[type][data.items[type].length - 1].id + 1;
            }

            if(type === "inc") {
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }

            data.items[type].push(item);
        },

        seeData: function() {
            return data;
        }
    };

})();

var appController = (function(uiController, financeController) {
    
    var ctrlAddItems = function(){
        var input = uiController.getInput();

        financeController.addItem(input.type, input.description, input.value);
    };

    var setupEventListeners = function(){
        var DOM = uiController.getDOM();

        document.querySelector(DOM.add__btn).addEventListener("click", function(){
            ctrlAddItems();
        });

        document.addEventListener("keypress", function(event){
            if(event.keyCode === 13) {
                ctrlAddItems();
            }
        });
    };

    return {
        init: function(){
            console.log("Application started...");
            setupEventListeners();
        }
    };

})(uiController, financeController);

appController.init();