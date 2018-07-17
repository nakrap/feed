$(document).ready(function () {
    // The get request will grab all of the events from the Data Base
    $.get("/api/events", function (data) {
        // (data) is two things
        // 1) userId - This is the current logged in users ID
        // Check back to event-api-route.js when a GET with a route of api/events
        // to see how we are getting (data)
        // 2) ResultsArr - This is an array that holds all of the events
        // You can see it in the console in the browser
        // console.log(data);

        // Creating variables to make life easier
        var currentUser = data.userId;
        var events = data.ResultsArr;
        // Setting the id where the cards will be placed to a var for ease
        var listOfEvents = $("#eventList");
        // Looping through events to build the event cards out
        for (var i = 0; i < events.length; i++) {

            // console.log(events[i]);
            // Checking if the currentUser is the one that created the event
            if (events[i].UserId === currentUser) {

                var eventCard = $("<div data-email='"+events[i].userEmail+"'>");
                eventCard.attr("id", "card-" + events[i].id);

                var eventName = $("<div>");
                eventName.text(events[i].eventName);

                var eventDate = $("<div>");
                eventDate.text("When: " + events[i].date);

                var eventLocation = $("<div>");
                eventLocation.text("Where: " + events[i].location);

                var eventDescription = $("<div>");
                eventDescription.text(events[i].description);

                // EDIT AND DELETE
                var editAndDelete = $("<div>");
                editAndDelete.attr("id", "editAndDelete-wrapper-" + events[i].id);

                var editBtn = $("<button>");
                editBtn.text("Edit");
                editBtn.attr("id", "editBtn-" + events[i].id);
                editBtn.addClass("edit-button");

                var deleteBtn = $("<button>");
                deleteBtn.text("Delete");
                deleteBtn.attr("id", "deleteBtn-" + events[i].id);
                deleteBtn.addClass("delete-button");

                editAndDelete.append(editBtn);
                editAndDelete.append(deleteBtn);


                eventCard.append(eventName);
                eventCard.append(eventDate);
                eventCard.append(eventLocation);
                eventCard.append(eventDescription);
                eventCard.append(editAndDelete);

                listOfEvents.append(eventCard);
            }
            // ELSE
            else {

                var eventCard = $("<div data-email='"+events[i].userEmail+"'>");
                eventCard.attr("id", "card-" + events[i].id);

                var eventName = $("<div>");
                eventName.text(events[i].eventName);

                var eventDate = $("<div>");
                eventDate.text("When: " + events[i].date);

                var eventLocation = $("<div>");
                eventLocation.text("Where: " + events[i].location);

                var eventDescription = $("<div>");
                eventDescription.text(events[i].description);

                var sponsorBtn = $("<button>");
                sponsorBtn.text("Sponsor");
                sponsorBtn.addClass("sponsor-btn");
                sponsorBtn.attr("id", "sponsorBtn-" + events[i].id);

                eventCard.append(eventName);
                eventCard.append(eventDate);
                eventCard.append(eventLocation);
                eventCard.append(eventDescription);
                eventCard.append(editAndDelete);

                listOfEvents.append(eventCard);

                eventCard.append(eventName);
                eventCard.append(eventDate);
                eventCard.append(eventLocation);
                eventCard.append(eventDescription);
                eventCard.append(sponsorBtn);

                listOfEvents.append(eventCard);
            }
        }
        // Create the card with an #id of event-card(events[i].id) to have a unique #id
    });
    var theNumberItself;
    // Handle click on Sponsor, Edit, or Delete button
    $(document).on("click", ".sponsor-btn", function (event) {
        console.log("clicked");
        var theNumberId = $(this).attr("id");
        var splicedNumArray = theNumberId.split("-");
        theNumberItself = splicedNumArray[1];

        $("#sponsorBtn-" + theNumberItself).hide();


        var rowVendorAndProduct = $("<div>");
        rowVendorAndProduct.addClass("row");

        var rowDescription = $("<div>");
        rowDescription.addClass("row");

        var rowButton = $("<div>");
        rowButton.addClass("row");

        sponsorArea = $("<div>");
        sponsorArea.attr("id", "sponsorArea-" + theNumberItself);

        var vendorForm = $("<form method='POST' action='contact' role+'form'>");
        
        var vendorName = $("<input>");
        vendorName.attr("type", "text");
        vendorName.attr("placeholder", "Vendor Name");
        vendorName.addClass("vendor-name-input");

        var productName = $("<input>");
        productName.attr("type", "text");
        productName.attr("placeholder", "Product Name");
        productName.addClass("product-name-input");

        var vendorEmail = $("<input>");
        vendorEmail.attr("type", "text");
        vendorEmail.attr("id", "vendorEmail");
        vendorEmail.attr("placeholder", "Vendor e-mail");
        vendorEmail.addClass("vendor-email-input");

        var productDescription = $("<textarea>");
        productDescription.attr("type", "text");
        productDescription.attr("placeholder", "Description");
        productDescription.addClass("product-description-input");

        var eventSponsorshipBtn = $("<button type='submit'>");
        eventSponsorshipBtn.text("Sponsor Event");
        eventSponsorshipBtn.addClass("event-sponsorship");

        var cancelBtn = $("<button>");
        cancelBtn.text("Cancel");
        cancelBtn.addClass("cancel-btn");

        rowVendorAndProduct.append(vendorName);
        rowVendorAndProduct.append(productName);
        rowVendorAndProduct.append(vendorEmail);
        rowDescription.append(productDescription);
        rowButton.append(eventSponsorshipBtn);
        rowButton.append(cancelBtn);

        vendorForm.append(rowVendorAndProduct);
        vendorForm.append(rowDescription);
        vendorForm.append(rowButton);

        sponsorArea.append(vendorForm);

        var cardDiv = $("#card-" + theNumberItself);
        cardDiv.append(sponsorArea);
    });

    $(document).on("click", ".event-sponsorship", function (event) {
        event.preventDefault();
        var vendorNameInput = $(".vendor-name-input").val().trim();
        var productNameInput = $(".product-name-input").val().trim();
        var vendorEmailInput = $(".vendor-email-input").val().trim();
        var productDescriptionInput = $(".product-description-input").val().trim();
        var eventId = theNumberItself;
        console.log("event sponsorship clicked");
        console.log(vendorNameInput);
        console.log(productNameInput);
        console.log(productDescriptionInput);
        console.log(vendorEmailInput);

        addSponsorship(vendorNameInput, productNameInput, productDescriptionInput, eventId);
        
        email(vendorNameInput, productNameInput, vendorEmailInput, productDescriptionInput);

        $(".vendor-name-input").val("");
        $(".product-name-input").val("");
        $(".product-description-input").val("")
    });
// function to call the API post.
    function email(vendorNameInput, productNameInput, vendorEmailInput, productDescriptionInput){
        $.post("/contact", {
                from: 'Market to Market <postmaster@sandbox5220afbde8c34d7b823a5aee1c709219.mailgun.org>',
                to: "tobross@gmail.com",
                vendor: "<b style='color:green'>From: "+vendorNameInput,
                product: "<b style='color:green'>Product: "+productNameInput,
                vendorEmail: "<b style='color:green'>Respond to: "+vendorEmailInput,
                text: "<b style='color:green'>Message: "+productDescriptionInput
    }).then(function(data){
        console.log(data);
    });
};

    function addSponsorship(vendorNameInput, productNameInput, productDescriptionInput, eventId) {
        $.post("/api/products", {
            vendorName: vendorNameInput,
            productName: productNameInput,
            description: productDescriptionInput,
            EventId: eventId
        }).then(function (data) {
            console.log(data);
        });
    }
    // Cancel Sponsor Button
    $(document).on("click", ".cancel-btn", function (event) {
        console.log("cancelBtn");
        $("#sponsorBtn-" + theNumberItself).show();
        sponsorArea.hide();
    });
    var theNumberItselfEdit;
    $(document).on("click", ".edit-button", function (event) {
        console.log("An event btn clicked");
        var theNumberIdEdit = $(this).attr("id");
        var splicedNumArrayEdit = theNumberIdEdit.split("-");
        theNumberItselfEdit = splicedNumArrayEdit[1];

        $("#editAndDelete-wrapper-" + theNumberItselfEdit).hide();

        console.log("sponsorBtn-" + theNumberItselfEdit);

        var rowEditName = $("<div>");
        rowEditName.addClass("row");

        var rowEditDate = $("<div>");
        rowEditDate.addClass("row");

        var rowEditLocation = $("<div>");
        rowEditLocation.addClass("row");

        var rowEditDescription = $("<div>");
        rowEditDescription.addClass("row");

        var rowButtons = $("<div>");
        rowButtons.addClass("row");

        var editEvent = $("<div>");
        editEvent.attr("id", "editEventArea-" + theNumberItselfEdit);

        var editEventName = $("<input>");
        editEventName.attr("type", "text");
        editEventName.attr("placeholder", "Event Name");
        editEventName.attr("id", "editEventName-" + theNumberItselfEdit);

        var editEventDate = $("<input>");
        editEventDate.attr("type", "date");
        editEventDate.attr("id", "editEventDate-" + theNumberItselfEdit);

        var editEventLocation = $("<input>");
        editEventLocation.attr("type", "text");
        editEventLocation.attr("placeholder", "Event Location");
        editEventLocation.attr("id", "editEventLocation-" + theNumberItselfEdit);

        var editEventDescription = $("<textarea>");
        editEventDescription.attr("type", "text");
        editEventDescription.attr("placeholder", "Event Description");
        editEventDescription.attr("id", "editEventDescription-" + theNumberItselfEdit);

        var saveEditBtn = $("<button>");
        saveEditBtn.text("Save");
        saveEditBtn.addClass("save-edit-button");

        var cancelEditBtn = $("<button>");
        cancelEditBtn.text("Cancel");
        cancelEditBtn.addClass("cancel-edit-button");

        rowEditName.append(editEventName);
        rowEditDate.append(editEventDate);
        rowEditLocation.append(editEventLocation);
        rowEditDescription.append(editEventDescription);
        rowButtons.append(saveEditBtn);
        rowButtons.append(cancelEditBtn);

        editEvent.append(rowEditName);
        editEvent.append(rowEditDate);
        editEvent.append(rowEditLocation);
        editEvent.append(rowEditDescription);
        editEvent.append(rowButtons);

        var editCardDiv = $("#card-" + theNumberItselfEdit);
        editCardDiv.append(editEvent);
    });

    $(document).on("click", ".cancel-edit-button", function (event) {
        console.log("cancel the edit clicked");
        console.log("editEventArea-" + theNumberItselfEdit);
        $("#editEventArea-" + theNumberItselfEdit).hide();
        $("#editAndDelete-wrapper-" + theNumberItselfEdit).show();
    });

    $(document).on("click", ".save-edit-button", function (event) {
        console.log("Save was clicked");
        getWhereId(theNumberItselfEdit);
    });

    function getWhereId(id) {
        console.log(id);
        $.get("/api/all-events/" + id, function (data) {
            if (data) {
                console.log(data);
                var newEventName = $("#editEventName-" + theNumberItselfEdit).val().trim();
                var newEventDate = $("#editEventDate-" + theNumberItselfEdit).val().trim();
                var newEventLocation = $("#editEventLocation-" + theNumberItselfEdit).val().trim();
                var newEventDescription = $("#editEventDescription-" + theNumberItselfEdit).val().trim();
                updatedData = {
                    id: theNumberItselfEdit,
                    eventName: newEventName,
                    date: newEventDate,
                    location: newEventLocation,
                    description: newEventDescription
                }
                updateEvent(updatedData);
            }
        });
    }

    function updateEvent(updatePost) {
        console.log(updatePost);
        $.ajax({
            url: "/api/all-events",
            method: "PUT",
            data: updatePost
        }).then(function (data) {
            console.log(data);
            window.location.href = "/all-events";
        });
    }

    var theNumberItselfDelete;
    $(document).on("click", ".delete-button", function (event) {
        event.preventDefault();
        console.log("delete was clicked");
        var theNumberIdDelete = $(this).attr("id");
        var splicedNumArrayDelete = theNumberIdDelete.split("-");
        theNumberItselfDelete = splicedNumArrayDelete[1];

        $("#deleteBtn-" + theNumberItselfDelete).hide();
        $("#editBtn-" + theNumberItselfDelete).hide();

        var yesAndNo = $("<div>");
        yesAndNo.addClass("yes-and-no");

        var areYouSure = $("<p>");
        areYouSure.text("Are You Sure?");

        var yesBtn = $("<button>");
        yesBtn.text("Yes");
        yesBtn.addClass("yes-delete");

        var noBtn = $("<button>");
        noBtn.text("No");
        noBtn.addClass("no-delete");

        yesAndNo.append(areYouSure);
        yesAndNo.append(yesBtn);
        yesAndNo.append(noBtn);

        var cardDiv = $("#card-" + theNumberItselfDelete);
        cardDiv.append(yesAndNo);
    });

    $(document).on("click", ".yes-delete", function (event) {
        console.log("Delete yes clicked");
        deleteEvent(theNumberItselfDelete);
    });

    function deleteEvent(id) {
        $.get("/api/all-events/" + id, function (data) {
            if (data) {
                console.log(data.id);
                $.ajax({
                    method: "DELETE",
                    url: "/api/all-events/" + id
                }).then(function (data) {
                    console.log(data);
                    window.location.href = "/all-events";
                });
            }
        });
    }

    $(document).on("click", ".no-delete", function (event) {
        console.log("no was clicked");
        $(".yes-and-no").hide();
        $("#deleteBtn-" + theNumberItselfDelete).show();
        $("#editBtn-" + theNumberItselfDelete).show();
    });
});