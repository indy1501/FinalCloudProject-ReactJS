//global.fetch = require('node-fetch');

export const eventService = {
    getAll,
    getEventByID,
    getSearchData,
    getMoreSearchData,
    createEvent,
    updateEvent,
    getEventByUserID,
    deleteEvent,
    createEventBooking,
    getEventBookingByUserID,
    uploadPhoto
}
export const apiConfig = {
    endpointURL: "http://localhost:3001",
}
function getAll() {
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/events/all`, requestOption).then(res => {
        // console.log(res); 
        return res.json();
    })
}
function getEventByID(eventId) {
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/events/${eventId}`, requestOption).then(res => {
        //console.log(res); 
        return res.json();
    })
}
function getSearchData(event_type, city) {
    console.log("event_type = " + event_type, "city = " + city);
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/events?event_type=${event_type}&city=${city}`, requestOption).then(res => {
        // console.log(res); 
        return res.json();
    })
}

function getMoreSearchData(event_type, city, last_key_business_id, last_key_city) {
    //console.log("business_type = "+business_type, "city = "+city);
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/events?event_type=${event_type}&city=${city}&last_key_business_id=${last_key_business_id}&last_key_city=${last_key_city}`, requestOption).then(res => {
        //console.log(res); 
        return res.json();
    })
}

function createEvent(userEmail, name, location, categories, address, city, state, postal_code, garage, street, validated, lot, valet) {
    const requestOption = {
        method: 'POST',
        body: JSON.stringify({
            "name": name,
            "location": location,
            "categories": categories,
            "address": address,
            "city": city,
            "state": state,
            "postal_code": postal_code,
            "attributes": {
                "BusinessParking": {
                    "garage": garage,
                    "street": street,
                    "validated": validated,
                    "lot": lot,
                    "valet": valet
                }
            }
        }),
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/users/${userEmail}/events`, requestOption).then(res => {
        //            console.log(res.json());
        return res.json();
    })
}
function updateEvent(eventId, name, location, categories, address, city, state, postal_code, garage, street, validated, lot, valet) {
    const requestOption = {
        method: 'PUT',
        body: JSON.stringify({
            "name": name,
            "location": location,
            "categories": categories,
            "address": address,
            "city": city,
            "state": state,
            "postal_code": postal_code,
            "attributes": {
                "BusinessParking": {
                    "garage": garage,
                    "street": street,
                    "validated": validated,
                    "lot": lot,
                    "valet": valet
                }
            }
        }),
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/events/${eventId}`, requestOption).then(res => {
        //            console.log(res.json());
        return res.json();
    })
}
function getEventByUserID(userEmail) {
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/users/${userEmail}/events`, requestOption).then(res => {
        //console.log(res); 
        return res.json();
    })
}
function deleteEvent(userEmail, eventId) {
    const requestOption = {
        method: 'DELETE',
        /* body: JSON.stringify({
            "deleteFile": fileName,
            "userId": id
        }), */
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/users/${userEmail}/events/${eventId}`, requestOption)
}
function createEventBooking(eventId,eventName,location,date,ticket_count,userEmail) {
    const requestOption = {
        method: 'POST',
        body: JSON.stringify({
            "event name": eventName,
            "location": location,
            "date": date,
            "ticket_count": ticket_count,
            "user_id": userEmail
        }),
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/events/${eventId}/booking`, requestOption).then(res => {
        //            console.log(res.json());
        return res.json();
    })
}
function getEventBookingByUserID(userEmail) {
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/users/${userEmail}/booking`, requestOption).then(res => {
        //console.log(res); 
        return res.json();
    })
}
function uploadPhoto(inputFile,userEmail) {
    const formData = new FormData();
    /* formData.append('inputFile', inputFile, "inputFile.img"); */
    formData.append('inputFile', inputFile, userEmail);
    const requestOption = {
        method: 'POST',
        body: formData,
       // headers: { "Content-Type": inputFile.type }
    }
    return fetch(`${apiConfig.endpointURL}/photoUpload/upload_photo`, requestOption).then(res => {
      console.log(res);
        return res;
    })
}