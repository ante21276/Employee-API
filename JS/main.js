!function() {

  function htmlCreate(divClass, number, pictureUrl, name, lastName, email,
                    city, cell, street,city2, state, postcode, dob, appendTo) { // Create employee function

      let html = "<div class=" + divClass + " data-attr=" + number + ">";
      html += "<div class='thumbnail'>";
      html += "<img src= " + pictureUrl + " data-attr=" + number + " alt='employee-photo'>";
      html += "</div>";
      html += "<article class='details' data-attr=" + number + ">";
      html += "<p class='name' data-attr=" + number + ">" + name + " " + lastName + "</p>";
      html += "<p class='email' data-attr=" + number + ">" + email + "</p>";
      html += "<p class='city'>" + city + "</p>";
      if(cell) {
          html += "<p class='cell'>" + cell + "</p>";
          html += "<p class='location'>" + street + ", " + city2 + " " + state + " " + postcode + "</p>";
          html += "<p class='dob'>" + dob + "</p>";
      }
    html += "</article>";
    html += "</div>";
    $(appendTo).append(html);
  }

  $.ajax({ //Get data
    url: 'https://randomuser.me/api/?results=5000',
    dataType: 'json',
    success: function(data) {
        console.log(data.results)
      for(let i = 0; i < 12; i++){
        htmlCreate("employee",
                  i,
                  data.results[i].picture.medium,
                  data.results[i].name.first,
                  data.results[i].name.last,
                  data.results[i].email,
                  data.results[i].location.city,
                  "","","","","","",
                  "main");
      }
      clickEmployee(data);
        searchEmployees();
    }
  });
  function clickEmployee(data) {
    document.querySelector("main").addEventListener("click", (e)=> {
      let employeeNumber = (parseInt(e.target.attributes[1].value)); //Employee ordinal number
      let dan = new Date(data.results[employeeNumber].dob);//Get date
      if (e.target.parentNode.parentElement.className === "employee" ||
          e.target.className === "employee" ||
          e.target.tagName === "IMG") {
        $("body").append("<div id='overlay' class='overlay'></div>");
        htmlCreate("active",
                    employeeNumber,
                    data.results[employeeNumber].picture.large,
                    data.results[employeeNumber].name.first,
                    data.results[employeeNumber].name.last,
                    data.results[employeeNumber].email,
                    data.results[employeeNumber].location.city,
                    data.results[employeeNumber].cell,
                    data.results[employeeNumber].location.street,
                    data.results[employeeNumber].location.city,
                    data.results[employeeNumber].nat,
                    data.results[employeeNumber].location.postcode,
                    dan.getDate() + "/" + dan.getMonth() + "/"+ dan.getYear(),
                    "#overlay");
      }
      $(".active").append($("<span class='close'>X</span>"));
      $(".active").append($("<span class='right nextPrevious'>></span>"));
      $(".active").append($("<span class='left nextPrevious'><</span>"));
      closeWindow();


      $(".left").click(function(){ //Previous employee
        let overlay = document.querySelector("#overlay");
        let act = document.querySelectorAll(".active");
        employeeNumber -= 1;
        if(employeeNumber === -1) {
          employeeNumber = 11;
        }
        let dan = new Date(data.results[employeeNumber].dob);//Get date
        htmlCreate("active",
                    employeeNumber,
                    data.results[employeeNumber].picture.large,
                    data.results[employeeNumber].name.first,
                    data.results[employeeNumber].name.last,
                    data.results[employeeNumber].email,
                    data.results[employeeNumber].location.city,
                    data.results[employeeNumber].cell,
                    data.results[employeeNumber].location.street,
                    data.results[employeeNumber].location.city,
                    data.results[employeeNumber].nat,
                    data.results[employeeNumber].location.postcode,
                    dan.getDate() + "/" + dan.getMonth() + "/"+ dan.getYear(),
                    "#overlay");
        $(".active").append($("<span class='close'>X</span>"));
        if(act.length > 1) {
          overlay.removeChild(overlay.childNodes[1]);
        }
        closeWindow()
      });

      $(".right").click(function(){ // Next employee
        let overlay = document.querySelector("#overlay");
        let act = document.querySelectorAll(".active");
        let dan = new Date(data.results[employeeNumber].dob);//Get date
        employeeNumber += 1;

        if(employeeNumber === 12 ) {
          employeeNumber = 0;
        }
        dan = new Date(data.results[employeeNumber].dob);

        htmlCreate("active",
                    employeeNumber,
                    data.results[employeeNumber].picture.large,
                    data.results[employeeNumber].name.first,
                    data.results[employeeNumber].name.last,
                    data.results[employeeNumber].email,
                    data.results[employeeNumber].location.city,
                    data.results[employeeNumber].cell,
                    data.results[employeeNumber].location.street,
                    data.results[employeeNumber].location.city,
                    data.results[employeeNumber].nat,
                    data.results[employeeNumber].location.postcode,
                    dan.getDate() + "/" + dan.getMonth() + "/"+ dan.getYear(),
                    "#overlay");
        $(".active").append($("<span class='close'>X</span>"));
        if(act.length > 1) {
          overlay.removeChild(overlay.childNodes[1]);
        }

        closeWindow()
      });
    });//End listener

  } //End of function

  function closeWindow() { // Close window when X clicked
    $( ".close" ).click(function() {
      $("#overlay").remove();
    });
  }

  function searchEmployees () { //Search for employee
      let employees = document.querySelectorAll(".employee");

      $(document).on('keyup','#searchField', function() { //Key up functions to filter employees
          let bla = $('#searchField').val().toLowerCase();

          for(let i = 0; i < employees.length; i++) {
              if((employees[i].children[1].children[0].textContent).indexOf(bla) < 0 ) {
                  employees[i].className = "hide";
              } else {
                  employees[i].className = "employee";
              }
          }
      })
  }

}();