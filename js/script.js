
// File: script.js
// GUI Assignment: HW4 - Part 1: Validation Plugin
// Aaron Roche
// aaron_roche@student.uml.edu

// Selecting DOM elements
const inputVal = document.querySelector('.inputVal');
const startMultiplierText = document.getElementById("startMultiplierText");
const endMultiplierText = document.getElementById("endMultiplierText");
const startMultiplicandText = document.getElementById("startMultiplicandText");
const endMultiplicandText = document.getElementById("endMultiplicandText");
const table = document.getElementById("table");
var startMultiplier, endMultiplier, startMultiplicand, endMultiplicand;

$(function() {
    // Custom validator method to compare values
    jQuery.validator.addMethod("compare", function(value, element, params) {
        var n1 = parseInt(value);
        var n2 = parseInt($('input[name="' + params[0] +'"]').val());
        if (isNaN(n1) || isNaN(n2)) {
            return true;
        }
        if (params[2]) {
            return n1 <= n2;
        } else {
            return n1 >= n2;
        }
    }, "<p>Start {1} value must be less than or equal to End {1} value!</p>");

    // Custom validator method to check range
    jQuery.validator.addMethod("checkRange", function(value, element, params) {
        var n1 = parseInt(value);
        var n2 = parseInt($('input[name="' + params[0] +'"]').val());
        if (isNaN(n1) || isNaN(n2)) {
            return true;
        }
        if (params[2]) {
            return Math.abs(n2 - n1) <= 200;
        } else {
            return Math.abs(n1 - n2) <= 200;
        }
    },"<p>{1} The value cannot be greater than 200</p><p>must be between start and end values!</p>");

    // Initializing form validation
    $("#inputVal").validate({
        rules: {
            startMultiplier : {
                required: true,
                number: true,
                compare: ['endMultiplier', 'Column', true],
                checkRange: ['endMultiplier', 'Column', true]
            },
            endMultiplier : {
                required: true,
                number: true,
                compare: ['startMultiplier', 'Column', false],
                checkRange: ['startMultiplier', 'Column', false]
            },
            startMultiplicand : {
                required: true,
                number: true,
                compare: ['endMultiplicand', 'Row', true],
                checkRange: ['endMultiplicand', 'Row', true]
            },
            endMultiplicand : {
                required: true,
                number: true,
                compare: ['startMultiplicand', 'Row', false],
                checkRange: ['startMultiplicand', 'Row', false]
            }
        },
        messages: {
            // Validation error messages
            startMultiplier: {
                required: "<p>Please enter a number</p>",
                number: "<p>Please enter a valid number</p><p>No special characters!</p>"
            },
            endMultiplier: {
                required: "<p>Please enter a number</p>",
                number: "<p>Please enter a valid number</p><p>No special characters!</p>"
            },
            startMultiplicand: {
                required: "<p>Please enter a number</p>",
                number: "<p>Please enter a valid number</p><p>No special characters!</p>"
            },
            endMultiplicand: {
                required: "<p>Please enter a number</p>",
                number: "<p>Please enter a valid number</p><p>No special characters!</p>"
            }
        },
        // Customizing error placement
        positionForErrors: function(error, element) {
            if (element.attr("name") == "startMultiplier") {
                error.appendTo($("#startMultiplierText"));
            } else if (element.attr("name") == "endMultiplier") {
                error.appendTo($("#endMultiplierText"));
            } else if (element.attr("name") == "startMultiplicand") {
                error.appendTo($("#startMultiplicandText"));
            } else if (element.attr("name") == "endMultiplicand") {
                error.appendTo($("#endMultiplicandText"));
            }
        },
        // Handling form submission
        valueHandler: function(form, e) {
            e.preventDefault();
            // Extracting and rounding input values
            startMultiplier = Math.round(document.getElementById("startMultiplier").value);
            endMultiplier = Math.round(document.getElementById("endMultiplier").value);
            startMultiplicand = Math.round(document.getElementById("startMultiplicand").value);
            endMultiplicand = Math.round(document.getElementById("endMultiplicand").value);
            // Displaying information to the user
            infotext.innerHTML = "<p>Values that have decimals will be rounded to the nearest whole number.</p>";
            // Generating and displaying the multiplication table
            table.innerHTML = generate(startMultiplier, endMultiplier, startMultiplicand, endMultiplicand);
        }
    })
});

// Function to create the multiplication table HTML
function generate(startMultiplier, endMultiplier, startMultiplicand, endMultiplicand) {
    var values = "";
    values += "<center><table>";
    values +="<tr><th id = \"space\"><center>x</center></th>"
    for (var a = startMultiplier; a <= endMultiplier; a++) {
        values +="<th id=\"row\"><center>" + a + "</center></th>";
    }
    values += "</tr>";
    for (var i = startMultiplicand; i <= endMultiplicand; i++) {
        values += "<tr>";
        values += "<th id=\"row\"><center>" + i + "</center></th>"
        for (var j = startMultiplier; j <= endMultiplier; j++) {
          values += "<td><center>" + i * j + "</center></td>";
        }
        values += "</tr>";
    }
    values += "</table></center>";
    return values;
}
