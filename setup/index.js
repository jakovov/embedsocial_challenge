

fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {

        var offset = 0;
        var NumberOfPosts = 4;
        var ActiveFilter = "all";

        // takes n posts but filters them, will search the array for elements that match the filter and mutate the offset 
        function TakeNPosts(arr, o, n = 4) {
            let result = [];
            let count = 0;
            let objectTraversed = 0;
            console.log(o);
            for (let i = o; i < arr.length; i++) {
                if (ActiveFilter == "all") {
                    result.push(arr[i]);
                    count++;
                }
                else if (arr[i].source_type == ActiveFilter) {
                    result.push(arr[i]);
                    count++;
                }
                // if we find enough elements that match the filter we exit the loop, stop the search
                if (count == n) {
                    offset = offset + 1;
                    break;
                }
                objectTraversed++;
            }

            offset += objectTraversed;
            return result;
        }

        // How many posts to create (it starts with 4)

        function DisplayPosts(n = 4) {

            var posts = TakeNPosts(data, offset, n);
            console.log(posts);
            posts.forEach(postData => {
                
                const domElement = showPost(postData);
                attachLikeEvent(domElement);
                
            });
            
            if (offset >= data.length) {
                loadmorebutton[0].style.display = "none";
            }
            else if (offset < data.length && loadmorebutton[0].style.display == 'none') {
                loadmorebutton[0].style.display = "flex";
            }
        }

        var loadmorebutton = document.getElementsByClassName("loadmoredivstyle");


        //Create load more button with a function

        let buttonholder = document.getElementsByClassName("preview");
        let createddivforbutton = document.createElement("div");
        let createdbutton = document.createElement("button");
        createddivforbutton.classList.add("loadmoredivstyle");
        createdbutton.classList.add("loadmorestyle");
        buttonholder[0].appendChild(createddivforbutton);
        createddivforbutton.appendChild(createdbutton);
        createdbutton.innerHTML = "LOAD MORE";

        createdbutton.addEventListener("click", (e) => {
            DisplayPosts(NumberOfPosts);
            if(darktheme === true){
                console.log("rabote");
                DarkThemetest();
            }
            else {
                LightTheme();
                console.log("ne rabote");
            }
        })
        DisplayPosts(NumberOfPosts);

       

        //Render posts function
        function showPost(obj) {
            if (!obj) {
                return
            }
            var cardeden = document.getElementById('card-holder');
            var div = document.createElement("div");
            div.className = "post grid-item";
            
            div.innerHTML = 
            `   
            <div class="card-container">
                <div class="card-padding">
                    <div class="card-top">
                        <div class="profile">
                            <div class="profile_image">
                                <img src="${obj.profile_image}" alt="">
                            </div>
                            <div class="profile-info">
                                <h4 class="namestyle">${obj.name}</h4>
                                <p class="datestyle">${obj.date.split(" ", 1)}</p>
                            </div>
                        </div>
                        <div class="topicon">
                            <img class="" src=" ${obj.source_type === "facebook" ? "../icons/facebook.svg" : "../icons/instagram-logo.svg"}" style=""width= "24px;", height= "24px;""/>
                        </div>
                    </div>
                    <div class="card-img">
                        <img class="card__image" src="${obj.image}"/>
                    </div>
                    <div class="card__inner">
                        <p class="innerstyle" style="height:150px">${obj.caption}</p>
                        <hr class="u-no-margin--bottom">
                            <div class="card__inner2">
                                <svg class="likebtn" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7617 3.26543C14.3999 2.90347 13.9703 2.61634 13.4976 2.42045C13.0248 2.22455 12.518 2.12372 12.0063 2.12372C11.4945 2.12372 10.9878 2.22455 10.515 2.42045C10.0422 2.61634 9.61263 2.90347 9.25085 3.26543L8.50001 4.01626L7.74918 3.26543C7.0184 2.53465 6.02725 2.1241 4.99376 2.1241C3.96028 2.1241 2.96913 2.53465 2.23835 3.26543C1.50756 3.99621 1.09702 4.98736 1.09702 6.02084C1.09702 7.05433 1.50756 8.04548 2.23835 8.77626L2.98918 9.52709L8.50001 15.0379L14.0108 9.52709L14.7617 8.77626C15.1236 8.41448 15.4108 7.98492 15.6067 7.51214C15.8026 7.03935 15.9034 6.53261 15.9034 6.02084C15.9034 5.50908 15.8026 5.00233 15.6067 4.52955C15.4108 4.05677 15.1236 3.62721 14.7617 3.26543V3.26543Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                <p class="likesvalue"style="padding-left:5px">${obj.likes}</p>
                            </div>
                    </div>
                </div>
            </div>`



            







            // div.innerHTML =
            //     '<div class="card-container"><div class="card-padding"><div class="card-top"><div class="profile"><div class="profile_image"><img src="' +
            //     obj.profile_image + '" alt=""></div><div class="profile-info"><h4 class="namestyle">' +
            //     obj.name + '</h4><p class="datestyle">' +
            //     obj.date.split(" ", 1) + '</p></div></div><div class="topicon"><img class="" src="../icons/instagram-logo.svg"/></div></div><div class="card-img"><img class="card__image" src="' +
            //     obj.image + '"/></div><div class="card__inner"><p class="innerstyle" style="height:150px">'+
            //     obj.caption + '</p><hr class="u-no-margin--bottom"><div class="card__inner2"><svg class="likebtn" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7617 3.26543C14.3999 2.90347 13.9703 2.61634 13.4976 2.42045C13.0248 2.22455 12.518 2.12372 12.0063 2.12372C11.4945 2.12372 10.9878 2.22455 10.515 2.42045C10.0422 2.61634 9.61263 2.90347 9.25085 3.26543L8.50001 4.01626L7.74918 3.26543C7.0184 2.53465 6.02725 2.1241 4.99376 2.1241C3.96028 2.1241 2.96913 2.53465 2.23835 3.26543C1.50756 3.99621 1.09702 4.98736 1.09702 6.02084C1.09702 7.05433 1.50756 8.04548 2.23835 8.77626L2.98918 9.52709L8.50001 15.0379L14.0108 9.52709L14.7617 8.77626C15.1236 8.41448 15.4108 7.98492 15.6067 7.51214C15.8026 7.03935 15.9034 6.53261 15.9034 6.02084C15.9034 5.50908 15.8026 5.00233 15.6067 4.52955C15.4108 4.05677 15.1236 3.62721 14.7617 3.26543V3.26543Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/></svg><p class="likesvalue"style="padding-left:5px">' +
            //     obj.likes + '</p></div></div></div></div>'
            cardeden.appendChild(div);
            return div;
        }

        //like function 

        function attachLikeEvent(element) {
            const card_inner2 = element.getElementsByClassName('likebtn')[0];
            const likeBtn = element.getElementsByClassName('likebtn')[0];
            const likeValue = element.getElementsByClassName('likesvalue')[0];
            card_inner2.addEventListener("click", e => {
                if (likeBtn.style.fill == 'none') {
                    const likes = parseInt(likeValue.innerHTML);
                    likeBtn.style.fill = "red";
                    likeValue.innerHTML = likes + 1;
                }
                else if (likeBtn.style.fill == 'red') {
                    const likes = parseInt(likeValue.innerHTML);
                    likeBtn.style.fill = "none";
                    likeValue.innerHTML = likes - 1;
                }
                else {
                    const likes = parseInt(likeValue.innerHTML);
                    likeBtn.style.fill = "red";
                    likeValue.innerHTML = likes + 1;
                }
            });
        }


        //Implement 1 Number of Collumns
        var previewstyle = document.getElementById("card-holder");
        var mainpreview = document.getElementsByClassName("preview");
        var innerstyle = document.getElementsByClassName("innerstyle");
        function show_hide() {
            var collumns = document.getElementById("numberOfColumns");
            console.log(collumns)

            collumns.addEventListener("click", (event) => {
                if(darktheme === true){
                    console.log("rabote");
                    DarkThemetest();
                }
                else {
                    LightTheme();
                    console.log("ne rabote");
                }
                if (event.target.value === "1") {
                    previewstyle.setAttribute("style", "grid-template-columns : auto");
                    mainpreview[0].setAttribute("style", "width : 25%");
                    // for (i = 0; i < innerstyle.length; i++) {
                    //     innerstyle[i].setAttribute("style", "height : 300px");

                    // }

                }
                else if (event.target.value === "2") {
                    previewstyle.setAttribute("style", "grid-template-columns : auto auto");
                    mainpreview[0].setAttribute("style", "width : 50%");
                    // for (i = 0; i < innerstyle.length; i++) {
                    //     innerstyle[i].setAttribute("style", "height : 300px");
                    // }
                }
                else if (event.target.value === "3") {
                    previewstyle.setAttribute("style", "grid-template-columns : auto auto auto");
                    mainpreview[0].setAttribute("style", "width : 75%");
                    // for (i = 0; i < innerstyle.length; i++) {
                    //     innerstyle[i].setAttribute("style", "height : 300px");
                    // }
                }
                else if (event.target.value === "4") {
                    previewstyle.setAttribute("style", "grid-template-columns : auto auto auto auto");
                    mainpreview[0].setAttribute("style", "width : 80%");
                    // for (i = 0; i < innerstyle.length; i++) {
                    //     innerstyle[i].setAttribute("style", "height : 400px");
                    // }
                }
                else if (event.target.value === "5") {
                    previewstyle.setAttribute("style", "grid-template-columns : auto auto auto auto auto");
                    mainpreview[0].setAttribute("style", "width : 100%");
                    // for (i = 0; i < innerstyle.length; i++) {
                    //     innerstyle[i].setAttribute("style", "height : 500px");
                    // }
                }
                else if (event.target.value === "dynamic") {

                    previewstyle.setAttribute("style", "grid-template-columns : auto auto");
                    // mainpreview[0].setAttribute("style", "width : 50%");
                    // for (i = 0; i < innerstyle.length; i++) {
                    //     innerstyle[i].setAttribute("style", "height : 300px");
                    // }
                }
            });

        }
        show_hide();


        //Implement 2 Card background color
        let changecolorbtn = document.querySelector('#cardBackgroundColor');
        changecolorbtn.addEventListener("change", (event) => {
            let containertarget = document.querySelectorAll(".card-container");
            var inputcolorvalue = document.getElementById("cardBackgroundColor").value;
            
            for (k = 0; k < containertarget.length; k++) {
                containertarget[k].style.background = inputcolorvalue;
            }
        });


        //Implement 3 Cards space between

        let gapinput = document.querySelector('#cardSpaceBetween');
        gapinput.addEventListener("change", (event) => {
            let cardGap = document.getElementsByClassName("grid-item");
            var gapvalue = document.getElementById("cardSpaceBetween").value;
            if (gapvalue.includes('px')) {
                var mile = document.getElementById("card-holder");
                mile.style.gap = gapvalue;
            }
            else {
                var mile = document.getElementById("card-holder");
                mile.style.gap = gapvalue + "px";
            }


        });

        //Implement 4 Choose Theme     
        var darktheme = false;
        var testirame = document.getElementsByClassName("grid-item");
        const radioButtons = document.querySelectorAll('input[name="theme"]');
        var maincontainer = document.getElementsByClassName("container");
        var previewcontainer = document.getElementsByClassName("preview");
        var sidebarcontainer = document.getElementsByClassName("sidebar");
        var cardcontainer = document.getElementsByClassName("card-container");
        var layout = document.getElementsByClassName("preview");
        var profilename = document.getElementsByClassName("namestyle");
        let likeicon = document.getElementsByClassName("likebtn");
        for (var i = 0; i < radioButtons.length; i++) {
            radioButtons[i].addEventListener('change', function(){
        
                if (this.value === "darkTheme") {
                    DarkThemetest();
                    darktheme = true;
                }
                else {
                    LightTheme();
                    darktheme = false;
                }
            });
        } 
  
    function DarkThemetest(){
        for (i = 0; i < likeicon.length; i++) {
            likeicon[i].style.fill = "white";
        }
        for (i = 0; i < profilename.length; i++) {
            profilename[i].style.color = "white";
        }
        for (i = 0; i < cardcontainer.length; i++) {
            cardcontainer[i].style.border = "solid 1px white";
            cardcontainer[i].style.color = "white";
            cardcontainer[i].style.background = "black";
            testirame[i].style.background = "black";
        }
        layout[0].style.background = "black";
        maincontainer[0].style.background = "black";
        maincontainer[0].style.color = "white";
        previewcontainer[0].style.background = "black";
        previewcontainer[0].style.color = "white";
        sidebarcontainer[0].style.background = "black";
        sidebarcontainer[0].style.color = "white";
        
    }
    function LightTheme(){
        for (i = 0; i < likeicon.length; i++) {
            likeicon[i].style.fill = "none";
        }
        for (i = 0; i < profilename.length; i++) {
            profilename[i].style.color = "black";
        }
        for (i = 0; i < cardcontainer.length; i++) {
            cardcontainer[i].style.border = "solid 1px rgba(0, 0, 0, 0.26)";
            cardcontainer[i].style.color = "black";
            cardcontainer[i].style.background = "white";
            testirame[i].style.background = "white";
        }
        layout[0].style.background = "white";
        maincontainer[0].style.background = "white";
        maincontainer[0].style.color = "black";
        previewcontainer[0].style.background = "white";
        previewcontainer[0].style.color = "black";
        sidebarcontainer[0].style.background = "white";
        sidebarcontainer[0].style.color = "black";
       
    }
        //Implement 5 Filter by source 
        const filterRadios = document.querySelectorAll('input[name="filterBySource"]');

        for (let i = 0; i < filterRadios.length; i++) {
            filterRadios[i].addEventListener('change', function () {
                document.getElementById('card-holder').innerHTML = "";
                ActiveFilter = this.value;
                offset = 0;
                DisplayPosts(NumberOfPosts);
                if(darktheme === true){
                    console.log("rabote");
                    DarkThemetest();
                }
                else {
                    LightTheme();
                    console.log("ne rabote");
                }
            });
        }
        // var testirame = document.getElementsByClassName("grid-item");
        // var maincontainer = document.getElementsByClassName("container");
        // var previewcontainer = document.getElementsByClassName("preview");
        // var sidebarcontainer = document.getElementsByClassName("sidebar");
        // var cardcontainer = document.getElementsByClassName("card-container");
        // var layout = document.getElementsByClassName("preview");
        // var profilename = document.getElementsByClassName("namestyle");
        // var cardholder = document.getElementsByClassName("post");
        let MediaQuery_mobile = window.matchMedia('(max-width: 767px)');

        function widthChangeCallback(MediaQuery_mobile) {
          if(MediaQuery_mobile.matches) {
            previewstyle.setAttribute("style", "grid-template-columns : auto");
            sidebarcontainer[0].style.display = "none";

            mainpreview[0].setAttribute("style", "width : 100%");
            
           } 
        }
        
        MediaQuery_mobile.addEventListener('change', widthChangeCallback);
        
        widthChangeCallback(MediaQuery_mobile);

        //tablet
        var disablecollumns = document.getElementById("numberOfColumns");
        let MediaQuery_tablet = window.matchMedia('(min-width: 768px)');
        function tabletChangeCallback(MediaQuery_tablet) {
            if(MediaQuery_tablet.matches) {
                disablecollumns.setAttribute("disabled","");
              previewstyle.setAttribute("style", "grid-template-columns : auto auto");
              
              sidebarcontainer[0].style.display = "block";
              mainpreview[0].setAttribute("style", "width : 100%");
              
             }
          }
          
          MediaQuery_tablet.addEventListener('change', tabletChangeCallback);
          
          tabletChangeCallback(MediaQuery_tablet);
          // laptop
          let MediaQuery_laptop = window.matchMedia('(min-width: 992px)');
        function laptopChangeCallback(MediaQuery_laptop) {
            if(MediaQuery_laptop.matches) {
              previewstyle.setAttribute("style", "grid-template-columns : auto auto");
              disablecollumns.removeAttribute("disabled","");
              sidebarcontainer[0].style.display = "block";
              mainpreview[0].setAttribute("style", "width : 50%");
              
             }
          }
          
          MediaQuery_laptop.addEventListener('change', laptopChangeCallback);
          
          laptopChangeCallback(MediaQuery_laptop);
        // var c = window.matchMedia("(max-width: 768px)");
        // mobile(c);
        // function mobile(c) {

        //     previewstyle.setAttribute("style", "grid-template-columns : auto");
        //     mainpreview[0].setAttribute("style", "width : 25%");
        //     // for (i = 0; i < innerstyle.length; i++) {
        //     //     innerstyle[i].setAttribute("style", "height : 250px");


        //     // }
        // }
        // c.addListener(mobile);
        
        
        // var sidebar = document.getElementsByClassName("sidebar");
        // var z = window.matchMedia("(max-width: 992px)");
        // tablet(z);
        // function tablet(z) {
        //     sidebar[0].setAttribute("style", "width : 30%");
        //     previewstyle.setAttribute("style", "grid-template-columns : auto auto");
        //     mainpreview[0].setAttribute("style", "width : 50%");
        //     // for (i = 0; i < innerstyle.length; i++) {
        //     //     innerstyle[i].setAttribute("style", "height : 500px");
        //     // }
        // }
        // z.addListener(tablet);
        // var x = window.matchMedia("(min-width: 992px)");
        // show_hide(x) // Call listener function at run time
        // x.addListener(show_hide);
    });

