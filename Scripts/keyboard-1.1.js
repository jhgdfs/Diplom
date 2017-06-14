var i = 0;
var str = '';
var taskmas = new Array();
var taskstring = '';
var errorcount = 0;
var taskid = 0;
var output = '';
var output2 = '';
var carriage = 21;
var vertical = 2;
var strvertical = '';
var nextChar = "";
var pageBack = 1;
var Lng = 1;
var sLeft = "";
var returnUrl = "";
var spacecounter = 0;
var rightStringWidth = 0;
var leftStringWidth = 0;
var compld = 0;
function setTaskid(id) {
    taskid = id;
}
function setPageBack(num) {
    pageBack = num;
}

function setLNG(lg) {
    Lng = lg;
}

var sendresult = false;

var min = 0;
var sec = 1;
var totalsec = 1;
var startTime = 5;

$(window).unload(function () {
    if (sendresult == false) {
        $.getJSON("/Task/Savetaskresult", { TaskId: taskid, errorCount: 5, time: totalsec, symbols: i }, function (data) {
        });
    }

});



$(document).ready(function () {
    var crl = getCookie('SiteLanguage');
    var curLnId = 1;
    if (crl == 'en-US') curLnId = 2;

    $.getJSON("/Task/GetBackURL", { TaskId: taskid, PageBack: pageBack, Lngs: Lng }, function (data) {
        returnUrl = data;
    });


    $(".close-start-button").click(function () {
        var container = $("#start-window");
        container.hide();

        $("#myTxt").val("");
        $("#myTxt").focus();
        var timer = setInterval(
        function () {
            if (totalsec % 60 == 0) {
                min++;
                sec = 0;
            }
            var secstr = sec;
            if (sec < 10) secstr = '0' + sec;
            var minstr = min;
            if (min < 10) minstr = '0' + min;
            var time = minstr + ":" + secstr;
            document.getElementById("timer_div").innerHTML = time;
            sec++;
            totalsec++;
        }, 1000);
        return false;

    });

    $(".close-success-button").click(function () {
        window.location.pathname = returnUrl;
        return false;
    });

    $("#btn-success-complete").click(function () {
        window.location.pathname = returnUrl;
        return false;
    });

    $(".close-failed-window").click(function () {
        window.location.pathname = returnUrl;
        return false;
    });

    $("#btn-failed").click(function () {
        window.location.pathname = returnUrl;
        return false;
    });

    $("body").css("position", "relative");
    $("#diagram-id-1").diagram({
        size: "180",
        borderWidth: "3",
        bgFill: "#EEE",
        frFill: "#0E62C7",
        textSize: 0,
        textColor: '#2a2a2a'
    });
    if (curLnId == 1) {
        $("#startbutton").text("Кнопка будет доступна через 5 сек...");
    } else {
        $("#startbutton").text("Button will be available after 5 seconds...");
    };
    $("#start-window").show();


    var timer2 = setInterval(
    function () {
        startTime--;
        if (startTime > 0) {

            var prc = startTime * 20;
            var prcstr = prc.toString();
            var divhtmlstring = "<div id='diagram-id-1' class='diagram' data-percent='" + prcstr + "'><span id='seconds'>" + startTime.toString() + "</span></div>";
            if (curLnId == 1) {
                var buttontext = "Кнопка будет доступна через " + startTime + " сек...";
            } else {
                var buttontext = "Button will be available after " + startTime + " seconds...";
            };

            $("#startbutton").text(buttontext);
            $("#timerdiv").empty();
            $("#timerdiv").html(divhtmlstring);
            $("#diagram-id-1").diagram({
                size: "180",
                borderWidth: "3",
                bgFill: "#EEE",
                frFill: "#0E62C7",
                textSize: 0,
                textColor: '#2a2a2a'
            });
        };

        if (startTime === 0) {
            var divhtmlstring = "<div id='diagram-id-1' class='diagram' data-percent='0'><span id='seconds'>0</span></div>";
            $("#timerdiv").empty();
            $("#timerdiv").html(divhtmlstring);
            $("#diagram-id-1").diagram({
                size: "180",
                borderWidth: "3",
                bgFill: "#EEE",
                frFill: "#0E62C7",
                textSize: 0,
                textColor: '#2a2a2a'
            });
            if (curLnId == 1) {
                $("#startbutton").text("Начать задание");
            } else {
                $("#startbutton").text("Start exercise");
            };

            $("#startbutton").attr("class", "btn btn-blue");
            clearInterval(timer2);
        };
    }, 1000);



    $("#startbutton").click(function () {
        $("body").css("position", "relative");
        $("#start-window").remove();
        $("#myTxt").val("");
        $("#myTxt").focus();
        var timer = setInterval(
        function () {
            if (totalsec % 60 == 0) {
                min++;
                sec = 0;
            }
            var secstr = sec;
            if (sec < 10) secstr = '0' + sec;
            var minstr = min;
            if (min < 10) minstr = '0' + min;
            var time = minstr + ":" + secstr;
            document.getElementById("timer_div").innerHTML = time;
            sec++;
            totalsec++;
        }, 1000);
        return false;
    });

    taskstring = $("#AreaForTask").html();
    taskhtml = $("#AreaForTask").html();
    var cursor = i;
    var divlength = $("#AreaForTask").width();
    var ltcount = $("#AreaForTask").text().length;
    var step = Math.round(divlength / 22).toFixed(0);

    var FirstChar = taskstring.charAt(0);
    var frst = FirstChar.toLowerCase().charCodeAt(0);
    $("#" + frst).css("background-color", "#0E62C7");


    $('#letter_div').html(taskstring.charAt(i));
    var errorVal = $('#errorVal').text();
    var taskLenght = taskstring.length;

    for (var j = 0; j < taskLenght; j++) {
        taskmas[j] = taskstring.charCodeAt(j);
    }

    rightStringWidth = $("#rightString").width();
    leftStringWidth = $("#leftString").width();
    var smblINLeft = (Math.round(leftStringWidth / 22).toFixed(0));
    var smblINRight = (Math.round(rightStringWidth / 22).toFixed(0)) - 1;
    $('#leftString').html("&nbsp");
    $('#rightString').text(taskstring.substring(0, smblINRight - 1));


    $(document).keypress(function (event) {
        clearInterval(timer2);
        nextChar = taskstring.charAt(i + 1);
        currentChar = taskstring.charAt(i);
        var asc = nextChar.toLowerCase().charCodeAt(0);
        var crt = currentChar.toLowerCase().charCodeAt(0);
        $("#" + crt).css("background-color", "White");
        $("#" + crt).css("color", "#2C2E2F;");
        $("#" + asc).css("background-color", "#0E62C7");

        if (nextChar == " ") var nextChar = " ";
        $('#letter_div').html(nextChar);


        if ((event.which.toString() == taskmas[i]) && (compld==0)) {
            if (i >= taskLenght - 1) {
                compld++;
                $("#success-window").show();
                $("#task-canvas").remove();
                $("#windows-canvas").remove();
                $(".main-footer").remove();
                $("#marks-count").text(errorcount.toString());
                var currentSec = totalsec;
                var speed = Math.round(((i + 1) / currentSec).toFixed(2) * 60);
                var timestr = $("#timer_div").text();
                $("#success-speed").text(speed.toString());
                $("#success-time").text(SecondsToTime(currentSec));
                $("#marks-count").text(errorcount.toString());
                var progressPercents = (20 * errorcount).toString() + "%";
                $('#success-progress').css('width', progressPercents);
                $('#success-span').text("Допущено " + progressPercents + " ошибок");
                $.getJSON("/Task/Savetaskresult", { TaskId: taskid, errorCount: errorcount, time: totalsec, symbols: i }, function (data) {
                });
                sendresult = true;
            }

            cursor++;
        }
        else if ((event.which.toString() != taskmas[i]) && (compld == 0)) {
            errorcount++;
            $('#letter_div').html(taskstring.charAt(i + 1));
            $('#errorVal').html(errorcount);
            var nextChar = taskstring.charAt(i + 1);
            var output = taskhtml.substr(0, cursor) + "<span class='span-error'>" + taskstring.charAt(i) + "</span>" + taskhtml.substr(cursor + 1);
            taskhtml = output;
            cursor = cursor + 33;
            $('#AreaForTask').html(output);
            if ((errorcount >= 5) || (i >= taskLenght - 1) && (compld==0)) {
                compld++;
                $("#failed-window").show();
                $("#task-canvas").remove();
                $("#windows-canvas").remove();
                $(".main-footer").remove();
                var currentSec = totalsec;
                var speed = Math.round(((i + 1) / currentSec).toFixed(2) * 60);
                var timestr = $("#timer_div").text();
                $("#failed-speed").text(speed.toString());
                $("#failed-time").text(SecondsToTime(currentSec));
                $("#failed-count").text((i + 1).toString());
                $.getJSON("/Task/Savetaskresult", { TaskId: taskid, errorCount: errorcount, time: totalsec, symbols: i }, function (data) {
                });
                sendresult = true;
            }


        }
        i++;
        $('#leftString').html("&nbsp");
        $('#rightString').html("&nbsp");

        var previousChar = taskstring.charAt(i - 1);

        sLeft += previousChar;

        if (nextChar == " ") {
            $('#rightString').html("&nbsp" + taskstring.substring(i + 1, taskLenght).substring(0, smblINRight));
        }
        else {
            $('#rightString').text(taskstring.substring(i, taskLenght).substring(0, smblINRight));
        }

        $('#leftString').text(sLeft.slice(-smblINLeft));


    });



});

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function SecondsToTime(seconds) {
    var sec_num = parseInt(seconds);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
}   

$(document).keydown(function (e) {
    var nodeName = e.target.nodeName.toLowerCase();

    if (e.which === 8) {
        if ((nodeName === 'input' && e.target.type === 'text') ||
            nodeName === 'myTxt') {           
        } else {
            e.preventDefault();
        }
    }
});


