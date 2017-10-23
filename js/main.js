let currentTaskNum = 0;
let hours = 0;
let minutes = 25;
let seconds = 0;
let breakTime = 5;
let taskList = [];
let currentTask = 0;

taskList.add = (num, name, btime, time) => {
    taskList.push({
        number: num,
        name: name,
        break_time: btime,
        time: time
    })
    currentTask++;
}
let currentlyDoing = 0;

function displayMessage(type, message) {
    $('#messages').html('');
    let cssClass;
    type == 'error' ? cssClass = 'danger' : (type == 'warning' ? cssClass = 'warning' : cssClass = 'success');
    let template = `
    <div class="alert alert-dismissible alert-${cssClass} errorMsg">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <a href="#" class="alert-link">${message}</div>
    `;
    $('#messages').show().append(template).delay(5000).fadeOut(1400);
}


function takeTime(task) {
    return (task.hours * 60 * 60) + (task.minutes * 60) + task.seconds;
    console.log(time);
}

function breakTimer(btimeLeft, btimeTotal) {
    console.log('Current Task number: ', currentlyDoing);
    $('.btnText').html('')

    $('.btnText').append(`Break Time!`);
    let countDown = setInterval(() => {

        let hours = Math.floor(btimeLeft / 3600);
        let minutesLeft = Math.floor((btimeLeft) - (hours * 3600));
        let minutes = Math.floor(minutesLeft / 60);
        let seconds = btimeLeft % 60;
        $('#disTimer').html(`
        ${(hours <10 ? '0':'')+String(hours)}:${(minutes <10 ? '0':'')+String(minutes)}:${(seconds <10 ? '0':'')+String(seconds)}
        `);

        let percent = (btimeLeft / btimeTotal) * 100;

        $('#prgrBar').css({
            width: `${100 - percent}%`
        })
        btimeLeft = btimeLeft - 1;

        let displayTime = `tasklist`;

        if (btimeLeft < 0) {
            $('#prgrBar').css({
                width: `100%`
            })
            clearInterval(countDown);
            console.log(currentlyDoing);
            let time = takeTime(taskList[(currentlyDoing)].time);
            if (taskList[currentlyDoing + 1] == undefined) {
                $('.btnText').html('');
                $('.btnText').append(`Start`);
                $('#prgrBar').css({
                    width: `0%`
                })
                currentlyDoing = 0;
                $('#startBtn').attr('enabled', 'true');
            } else {
                currentlyDoing++;
                startTimer(time, time, taskList);
            }


        }
    }, 1000)

}

function startTimer(timeLeft, timeTotal, task) {
    $('#startBtn').attr('enabled', 'false');
    startBtnClickable = false;
    console.log('Current Task number: ', currentlyDoing);
    console.log(breakTime);

    $('.btnText').html('')

    $('.btnText').append(`Task <strong>no${task[currentlyDoing].number}</strong>`);
    let countDown = setInterval(() => {

        let hours = Math.floor(timeLeft / 3600);
        let minutesLeft = Math.floor((timeLeft) - (hours * 3600));
        let minutes = Math.floor(minutesLeft / 60);
        let seconds = timeLeft % 60;


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
            console.log('Current Task number: ', currentlyDoing);
            breakTimer((taskList[0].break_time) * 60, (taskList[0].break_time * 60));

        }
    }, 1000)



}

$('#startBtn').on('click', () => {
    if ($('#startBtn').attr('enabled') == 'true') {
        $('#messages').html('');
        if (taskList[0] == null) {
            displayMessage('error', `It seems you didn't add a task. Add a task in the Insert Task section, then Insert the Time, press Add and then Start the timer.`);
        } else {
            console.log(currentlyDoing);
            let time = takeTime(taskList[currentlyDoing].time);
            startTimer(time, time, taskList);
        }
    } else {
        displayMessage('warning', 'You are currently doing your Pomodoro tasks. If something went wrong refresh the page and start over again!');
    }



})


$('#addtskbtn').on('click', () => {
    let task = $('#taskinput').val();
    console.log($('#startBtn').attr('enabled'));
    if (task == '') {
        displayMessage('error', `Cannot add a task without a Title. Add the title then the time and then press Add.`);
    } else if (hours == 0 && minutes == 0 && seconds == 0) {
        displayMessage('error', `Add the time to your task!!`);
    } else {
        console.log(task);
        addTask(task);
    }

})

function addTask(t) {
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
    taskList.add(currentTaskNum, t, breakTime, {
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    });
    displayMessage('success', `Task #${currentTask} succesfully added!`)
    $('#taskList').append(taskTemplate);
    console.log(taskList);
}

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