var requestResult;

function call(uri, parameters, verb, isAsync, contentType, bodyName = null, body = null) {    
    if (body == null) 
        get(uri, parameters, verb, isAsync, contentType);
    else 
        post(uri, parameters, verb, isAsync, contentType, bodyName, body);
} 


function post(uri, parameters, verb, isAsync, contentType, bodyName, body) {

    $.ajax({
        url: `${uri}${parameters}`,
        type: verb,
        async: isAsync,
        contentType: contentType,
        dataType: 'json',
        data: "{"+ body + "}",
        success: function (success) {
            requestResult = success.d;
        },
        error: function (error) {
            requestResult = error;
        }
    }).done(function (done) {
        requestResult = done.d;
    });
}

function get(uri, parameters, verb, isAsync, contentType) {
    $.ajax({
        url: `${uri}${parameters}`,
        type: verb,
        async: isAsync,
        contentType: contentType,
        success: function (success) {
            requestResult = success.d;
        },
        error: function (error) {
            requestResult = error;
        }
    }).done(function (done) {
        requestResult = done.d;
    });
}