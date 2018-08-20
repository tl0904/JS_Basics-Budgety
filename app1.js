var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;                
            } else {
                ID = 0;
            }
            
            // Create new item based on 'exp' or 'inc' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // push it into our data structure
            data.allItems[type].push(newItem);
            
            // return the new element
            return newItem;
        },
        
        testing: function () {
            console.log(data);
        }
    };
    
})();

var UIController = (function () {
    
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value                
            };
        },
        
        getDOMStrings: function () {
            return DOMStrings;
        }
    };
    
})();

// A controller megkapja paraméterben a két IIFE metódust és így lesz közöttük kapcsolat.
var controller = (function (budgetCtrl, UICtrl) {
    
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };
    
    
    var ctrlAddItem = function () {
        var input, newItem;
    
    // 1. Get the field input data
        input = UICtrl.getInput();
    
    // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    
    // 3. Add the item to the UI
    
    // 4. Calculate the budget
    
    // 5. Display the budget on the UI
        
    }
    
    return {
        init: function () {
            console.log('The application has started.');
            setupEventListeners();
        }
    }
    
    
})(budgetController, UIController);

controller.init();


/* Closures példa: The variable add is assigned the return value of a self-invoking function.

The self-invoking function only runs once. It sets the counter to zero (0), and returns a function expression.

This way add becomes a function. The "wonderful" part is that it can access the counter in the parent scope.

This is called a JavaScript closure. It makes it possible for a function to have "private" variables.

The counter is protected by the scope of the anonymous function, and can only be changed using the add function. 

Olyan, mint Java-ban a Class. Pl. add class, mely teljesen önálló. A counter jelen esetben egy private változó, nem lehet elérni "kivülről". Az add osztály metódusa (function) hívható meg és visszaadja a counter változót. */

var add = (function () {
    var counter = 0;
    return function () {
        counter += 1; 
        return counter;
    }
})();