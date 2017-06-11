/**
 * Created by gaurav on 11/6/17.
 */
$(document).ready(function() {
    function addUserQuery(e) {
        if (e.keyCode == 13) {
            var elToAdd = document.createElement("div"); // create a div element
            elToAdd.setAttribute("class", "col-xs-8 userQuery"); // set class to newly added div element
            var content = e.target.value; //
            var elToAddText = document.createTextNode(content);
            elToAdd.appendChild(elToAddText); 
            var appendIn = document.getElementById("appendIn");
            appendIn.appendChild(elToAdd);
            e.target.value = "";
            setTimeout(response, 500);
            ScrollToBottom();
        }
        
        function addMessage(message) {
            var elToAdd = document.createElement("div");
            elToAdd.setAttribute("class", "col-xs-8 chatbotQuery");
            var elToAddText = document.createTextNode(message);
            elToAdd.appendChild(elToAddText);
            var appendIn = document.getElementById("appendIn");
            appendIn.appendChild(elToAdd);
            ScrollToBottom();
        }

        
        function response() {
            var message;
//            introduction
            if (content == "Hello"){
                message = "Hi!,Do you to buy a laptop";
                addMessage(message);
            }
            else if(content =="Yes"){
                message="What is your maximum budget";
                addMessage(message);
            }
            else if(content =="yes i want to buy"){
                message="http://lmgtfy.com/?q=buying+laptop";
                addMessage(message);
                message="Thank you for shopping through us,Bye have a nice day";
                addMessage(message);
            }
            else if (content =="no"){
                message = "Sorry, I can't help you";
                addMessage(message);
            }
//            MAXIMUM BUDGET OF USER AND SHOWING THEM LAPTOP ACCORDING TO THEIR BUDGET
            else if (typeof(parseInt(content)) == "number" && parseInt(content)) {
                var number = content;
                var url = "http://localhost:5000/laptop_sale/price_range_laptops/" + content;
                $.ajax({
                    type: "GET",
                    url: url,
                    data: {},
                    success: function(data) {
                        message = "@NAMES OF LAPTOP ACCRODING TO YOUR BUDGET";
                        addMessage(message)
                        for(var i=0; i<data.length; i++){
                            message = data[i]["Name"]+ "=" + data[i]["prize"] + "rupees";
                            addMessage(message);
                        }
                        message="NOW, YOU NEED TO SELECT A LAPTOP WHICH DID YOU LIKE.?"
                        addMessage(message);
                    }
                });
            }
            else{
                message ="I did not understand your words.please give me correct answer";
                addMessage(message);
            }
//            HERE WE ARE SHOWING SPECIFICATION OF USER CHOOSEN LAPTOP
            if (typeof(content) == "string") {
                var underscore = content.split(' ').join('_')
                var url = "http://localhost:5000/laptop_sale/laptop_details/" + underscore;
                $.ajax({
                    type: "GET",
                    url: url,
                    data: {},
                    success: function(data) {
                        for(var i=0; i<data.length; i++){
                            message = "~~~~~~~~~~~SPECIFICATIONS~~~~~~~~~~~";
                            addMessage(message)
                            message = "Battery Cell:--->" + data[i]['Battery Cell'] 
                            addMessage(message);
                            message="Operating System Type:--->" + data[i]['Operating System Type']
                            addMessage(message);
                            message="Dimensions(WxHxD):--->" + data[i]['Dimensions(WxHxD)']
                            addMessage(message);
                            message="RAM type:--->" + data[i]['RAM type']
                            addMessage(message);
                            message="Brand:--->" + data[i]['Brand']
                            addMessage(message);
                            message="HDD Capacity:--->" + data[i]['HDD Capacity']
                            addMessage(message);
                            message="Colors:--->" + data[i]['Colors']
                            addMessage(message);
                            message="Capacity:--->" + data[i]['Capacity']
                            addMessage(message);
                            message="Battery type:--->" + data[i]['Battery type']
                            addMessage(message);
                            message="Operating System:--->" + data[i]['Operating System']
                            addMessage(message);
                            message="Model:--->" + data[i]['Model']
                            addMessage(message);
                            message="prize:--->" + data[i]['prize']
                            addMessage(message);
                            message="DO YOU WANT TO BUY THIS LAPTOP?IF YES YOU NEED TO WRITE(yes i want to buy)"
                            addMessage(message);
                        }
                    }
                });
            }
        }
            

        

        //bot functioning
        function addQuery() {
            var elToAdd = document.createElement("div"); // create a div element
            elToAdd.setAttribute("class", "col-xs-8 userQuery"); // set class to newly added div element
            var content = document.getElementById("inputText").value; //
            var elToAddText = document.createTextNode(content);
            elToAdd.appendChild(elToAddText);
            var appendIn = document.getElementById("appendIn");
            appendIn.appendChild(elToAdd);
            document.getElementById("inputText").value = "";
            setTimeout(response, 500);
            ScrollToBottom();
        }

        var enterButton = document.getElementById("enterButton");
        enterButton.addEventListener("click", addQuery, false);


        function ScrollToBottom() {
            var d = document.getElementById("appendIn");
            d.scrollTop = d.scrollHeight;
        }
    }

    var inputText = document.getElementById("inputText");
    inputText.addEventListener("keypress", addUserQuery, false);
});