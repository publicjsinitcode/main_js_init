get_files_for_chat_and_include();

function get_files_for_chat_and_include() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/connector-to-analytics.php?type=get_files_chat');
    xhr.send();
    xhr.onload = function() {
        if (xhr.status != 200) {
            // console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            let respJson = JSON.parse(xhr.response);
            let script = document.createElement('script');
            let scriptTwo = document.createElement('script');

            let addScripts = new Promise(function (resolve, reject) {
                script.src = '/services/js/main.js?v='+respJson.resp.js.mainjs;
                scriptTwo.src = '/services/js/widgetForm.min.js?v='+respJson.resp.js.widgetFormminjs;
                document.getElementsByTagName('head')[0].appendChild(script);
                document.getElementsByTagName('head')[0].appendChild(scriptTwo);

                scriptTwo.onload = function () {
                    resolve({status: 200});
                }
            });

            let appWindow = window;
            addScripts.then(mew => {
                if(mew.status) {
                    appWindow.widgetForm({forms: ['form-appliancer-contact', 'subscribe-form-appliancer', 'modal-form-appliancer-plan', 'modal-callback-vertical', 'schedule-step', 'callback-vertical', 'connect-with-plumber', 'connect-with-plumber-quote', 'connect-with-plumber-energency', 'callback-vertical-whis-postcode', 'alp-connect-specialist-b-r', 'alp-connect-specialist', 'pro-connect-spec-border', 'pumb-schedule-service-b-r', 'subscribe-form', 'schedule-step-new', 'hvac-modal-form', 'hvac-horizont-form']});
                }
            });
            // console.log(xhr);
        }
    };
    xhr.onerror = function() {
        // console.log("Запрос не удался");
    };
}

function include_forms() {

}
