$(document).ready(() => {

    let socket = io.connect()

    let userName;

    swal("Enter your name here:", {
        content: "input",
    })
        .then((value) => {
            userName = value

            if (value == '') {
                userName = 'Anonymous'
            }

            navigator.geolocation.getCurrentPosition(function (location) {

                let data = {
                    'coords': location.coords.latitude + ',' + location.coords.longitude,
                    'userName': userName
                }

                socket.emit('coordinates', data)
            });
        });

    socket.on('userStatus', (message) => {
        console.log(message)
    })

    socket.on('broad', (data) => {

        let value;
        let count;
        if (Object.keys(data).length != 0) {

            value = ''
            count = 0
            for (let key in data) {
                count++
                console.log(data[key])
                value = value + `${data[key][1]}|flag-lg-4DBD33-${data[key][0]}`
                if (count != Object.keys(data).length) {
                    value = value + '||'
                }
            }

            document.getElementsByTagName('iframe')[0].src = `https://www.mapquestapi.com/staticmap/v5/map?key=7qAHtUkSymItMvSGgAl9Ib1ji8wc6lkV&scalebar=true|bottom&banner=locations+of+those+online|sm-top&locations=${value}&zoom=12&size=1500,800`
        }

    })

})