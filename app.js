// uiController
var uiController = (function() {
    var DOMStrings = {
        add__type: ".add__type",
        add__description: ".add__description",
        add__value: ".add__value",
        add__btn: ".add__btn",
        income__list: ".income__list",
        expenses__list: ".expenses__list",

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
        },

        clearFiealds: function(){
            var fields = document.querySelectorAll(DOMStrings.add__description + "," + DOMStrings.add__value);

            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(el) {
                el.value = "";
            });

            fieldsArr[0].focus();
        },

        addListItem: function(item, type){
            var html, list;

            if(type === "inc") {
                list = DOMStrings.income__list;
                html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else {
                list = DOMStrings.expenses__list;
                html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            html = html.replace("%id%", item.id);
            html = html.replace("%description%", item.description);
            html = html.replace("%value%", item.value);

            document.querySelector(list).insertAdjacentHTML("afterbegin", html);
        }
    };
})();

// financeController
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
                item = new Income(id, desc, parseInt(val));
            } else {
                item = new Expense(id, desc, parseInt(val));
            }

            data.items[type].push(item);

            return item;
        }
    };

})();

// appController
var appController = (function(uiController, financeController) {
    
    var ctrlAddItems = function(){
        var input = uiController.getInput();

        if(input.description !== "" && input.value !== "") {
            var item = financeController.addItem(input.type, input.description, input.value);

            uiController.addListItem(item, input.type);

            uiController.clearFiealds();
        }
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