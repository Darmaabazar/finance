// uiController
var uiController = (function() {
    var DOMStrings = {
        add__type: ".add__type",
        add__description: ".add__description",
        add__value: ".add__value",
        add__btn: ".add__btn",
        income__list: ".income__list",
        expenses__list: ".expenses__list",
        budget__value: ".budget__value",
        budget__income: ".budget__income--value",
        budget__expenses: ".budget__expenses--value",
        budget__expenses__percentage: ".budget__expenses--percentage",
        container: ".container"
    };
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.add__type).value,
                description: document.querySelector(DOMStrings.add__description).value,
                value: parseInt(document.querySelector(DOMStrings.add__value).value)

            };
        },

        getDOM: function(){
            return DOMStrings;
        },

        showEstimate: function(est){
            document.querySelector(DOMStrings.budget__value).textContent = est.balance;
            document.querySelector(DOMStrings.budget__income).textContent = "+ " + est.inc;
            document.querySelector(DOMStrings.budget__expenses).textContent = "- " + est.exp;
            document.querySelector(DOMStrings.budget__expenses__percentage).textContent = est.percent + "%";
        },

        clearFiealds: function(){
            var fields = document.querySelectorAll(DOMStrings.add__description + "," + DOMStrings.add__value);

            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(el) {
                el.value = "";
            });

            fieldsArr[0].focus();
        },

        deleteListItem: function(id){
            var el =  document.getElementById(id);
            el.parentNode.removeChild(el);
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

    var calculateTotal = function(type) {
        var sum = 0;

        data.items[type].forEach(function(el) {
            sum = sum + el.value;
        });

        return sum;
    };

    var data = {
        items: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        },

        balance: 0,
        percent: 0
    };

    return {
        deleteItem:  function(type, id) {
            var arr = data.items[type].map(function(el) {
                return  el.id;
            });

            var index = arr.indexOf(id);

            if (index !== -1) {
              data.items[type].splice(index, 1);
            }
        },    

        calculateBudget: function() {
            data.totals.inc = calculateTotal("inc");
            data.totals.exp = calculateTotal("exp");

            data.balance = data.totals.inc - data.totals.exp;
            data.percent = Math.round((data.totals.exp * 100)/data.totals.inc);
        },

        getBudget: function() {
            return {
                balance: data.balance,
                percent: data.percent,
                inc: data.totals.inc,
                exp: data.totals.exp
            }
        },

        addItem: function(type, desc, val) {
            var item, id;

            if(data.items[type].length === 0) id = type + "-" +1;
            else {
                id = type + "-" + (data.items[type][data.items[type].length - 1].id + 1);
            }

            if(type === "inc") {
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
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
            
            financeController.calculateBudget();
            var estimate = financeController.getBudget();
            

            uiController.showEstimate(estimate);
            
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

        document.querySelector(DOM.container)
              .addEventListener('click', function(event) {
                var id =  event.target.parentNode.parentNode.parentNode.parentNode.id;

                if(id){
                    var arr = id.split( "-" );
                    var type = arr[0];
                    var index = parseInt(arr[1]);

                    financeController.deleteItem(type,index);
                    uiController.deleteListItem(id);
                }
            });

    };

    return {
        init: function(){
            console.log("Application started...");
            uiController.showEstimate({
                balance: 0,
                percent: 0,
                inc: 0,
                exp: 0
            });
            setupEventListeners();
        }
    };

})(uiController, financeController);

appController.init();