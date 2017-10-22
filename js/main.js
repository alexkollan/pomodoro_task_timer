let currentTaskNum = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;
let breakTime = 0;
let taskList = [];
taskList.add = (num, name, time) => {
    taskList.push({
        number: num,
        name: name,
        time: time
    })

}
let currentlyDoing = 0;

function takeTime(t) {
    return (t.hours * 60 * 60) + (t.minutes * 60) + t.seconds;
    console.log(time);
}

function startTimer(timeLeft, timeTotal, task) {
    let countDown = setInterval(() => {

        // let days        = Math.floor(timeLeft/24/60/60);
        // let hoursLeft   = Math.floor((timeLeft) - (days*86400));
        let hours = Math.floor(timeLeft / 3600);
        let minutesLeft = Math.floor((timeLeft) - (hours * 3600));
        let minutes = Math.floor(minutesLeft / 60);
        let seconds = timeLeft % 60;


        // console.log(hours,'h',minutes,'m',seconds,'s');
        $('#disTimer').html(`
        ${(hours <10 ? '0':'')+String(hours)}:${(minutes <10 ? '0':'')+String(minutes)}:${(seconds <10 ? '0':'')+String(seconds)}
        `);

        let percent = (timeLeft / timeTotal) * 100;

        $('#prgrBar').css({
            width: `${100 - percent}%`
        })
        timeLeft = timeLeft - 1;

        let displayTime = `tasklist`;
        if (timeLeft < 0) {
            $('#prgrBar').css({
                width: `100%`
            })
            clearInterval(countDown);
            console.log(currentlyDoing);

        }
    }, 1000)
    currentlyDoing++;
}

$('#startBtn').on('click', () => {
    console.log(currentlyDoing);
    let time = takeTime(taskList[currentlyDoing].time);
    startTimer(time, time, taskList);

})


$('#addtskbtn').on('click', () => {
    let task = $('#taskinput').val();
    console.log(task);
    addTask(task);
})

function addTask(t, c) {
    currentTaskNum++;
    let taskTemplate = `
    <div class="panel panel-primary tasks">
        <div class="panel-heading">
            <h3 id="taskNum" class="panel-title">#${currentTaskNum} ${t}</h3>
        </div>
        <div class="panel-body">
        ${hours}h ${minutes}m ${seconds}s
            
        </div>
    </div>
    
    `
    taskList.add(currentTaskNum, t, {
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    });
    $('#taskList').append(taskTemplate);
    console.log(taskList);
}


// function timeBtn(action, time) {
//     if (action == 'add') {
//         switch (time) {
//             case 'h':
//                 hours++;
//                 $('#hText').text((hours < 10 ? '0' : '') + String(hours) + 'h');
//                 break;
//             case 'm':
//                 minutes++;
//                 $('#mText').text((minutes < 10 ? '0' : '') + String(minutes) + 'm');
//                 break;
//             case 's':
//                 seconds++;
//                 $('#sText').text((seconds < 10 ? '0' : '') + String(seconds) + 's');
//                 break;
//             case 'b':
//                 breakTime++;
//                 $('#bText').text((breakTime < 10 ? '0' : '') + String(breakTime) + 'm');
//                 break;
//             default:
//                 break;
//         }
//     } else {
//         switch (time) {
//             case 'h':
//                 hours--;
//                 $('#hText').text((hours < 10 ? '0' : '') + String(hours) + 'h');
//                 break;
//             case 'm':
//                 minutes--;
//                 $('#mText').text((minutes < 10 ? '0' : '') + String(minutes) + 'm');
//                 break;
//             case 's':
//                 seconds--;
//                 $('#sText').text((seconds < 10 ? '0' : '') + String(seconds) + 's');
//                 break;
//             case 'b':
//                 breakTime--;
//                 $('#bText').text((breakTime < 10 ? '0' : '') + String(breakTime) + 'm');
//                 break;
//             default:
//                 break;
//         }
//     }
// }

function timeBtn(action, time) {
    switch (time) {
        case 'h':
            action == 'add' ? hours++ : (hours == 0 ? hours = 0 : hours--);
            $('#hText').text((hours < 10 ? '0' : '') + String(hours) + 'h');
            break;
        case 'm':
            action == 'add' ? minutes++ : (minutes == 0 ? minutes = 0 : minutes--);
            $('#mText').text((minutes < 10 ? '0' : '') + String(minutes) + 'm');
            break;
        case 's':
            action == 'add' ? seconds++ : (seconds == 0 ? seconds = 0 : seconds--);
            $('#sText').text((seconds < 10 ? '0' : '') + String(seconds) + 's');
            break;
        case 'b':
            action == 'add' ? breakTime++ : (breakTime == 0 ? breakTime = 0 : breakTime--);
            $('#bText').text((breakTime < 10 ? '0' : '') + String(breakTime) + 'm');
            break;
        default:
            break;
    }
}