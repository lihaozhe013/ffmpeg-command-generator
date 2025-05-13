function goBack() {
    window.location.href = "index.html";
}

function goBackSimpleAdvancedPage() {
    window.location.href = "select-simple-advanced.html";
}
function resetTranscodingMode() {
    window.location.href = "transcode-mode.html";
}

function resetSimpleTranscodingMode() {
    window.location.href = "transcode-simple-mode.html";
}

function resetCopyMode() {
    window.location.href = "copy-mode.html";
}

function generateCopyCommand() {
    const outputBox = document.getElementById('output-box');
    const fileName = document.getElementById("input-file-name");
    let fullFileName = `"`+ fileName.value + `"`;
    // let fullFileName = "11111";
    const containerFormat = document.querySelector('input[name="select-container"]:checked');
    let output;
    output = "ffmpeg -i " + fullFileName + " -c copy output." + containerFormat.value;
    outputBox.textContent = output;
}

function generateTranscodeCommand() {
    const outputBox = document.getElementById('output-box');
    const fileName = document.getElementById("input-file-name");
    let fullFileName = `"`+ fileName.value + `"`;
    const codingFormat = document.querySelector('input[name="select-coding-format"]:checked');
    const audioQuality = document.querySelector('input[name="select-audio-quality"]:checked');
    const fastOrSlow = document.querySelector('input[name="fast-or-slow-mode"]:checked');
    const numberOfThreads = document.getElementById('threads');
    const containerFormat = document.querySelector('input[name="select-container"]:checked');
    const transcodingQuality = document.getElementById("quality");
    if (transcodingQuality.value > 51) {
        transcodingQuality.value = 51;
        alert('Transcoding Quality should be at least 0, and cannot be more than 51');
    }
    else if (transcodingQuality.value < 0) {
        transcodingQuality.value = 0;
        alert('Transcoding Quality should be at least 0, and cannot be more than 51');
    }
    let presetValue = fastOrSlow.value;
    let transcoder = "";
    if (codingFormat.id === "av1") {
        transcoder = "libsvtav1";
        if (transcodingQuality.value > 13) {
            transcodingQuality.value = 13;
            alert('Transcoding Quality for AV1 should be at least 0, and cannot be more than 13');
        }
        else if (transcodingQuality.value < 0) {
            transcodingQuality.value = 0;
            alert('Transcoding Quality fo AV1 should be at least 0, and cannot be more than 13');
        }
        presetValue = transcodingQuality.value;
    } else if (codingFormat.id === "hvac") {
        transcoder = "libx265";
    } else if (codingFormat.id === "avc") {
        transcoder = "libx264";
    }
    
    let output = "ffmpeg -i " + fullFileName + " -c:v " + transcoder + " -crf " + transcodingQuality.value + " -preset " + presetValue + " -c:a aac -b:a " + audioQuality.value + "k -movflags +faststart -threads " + numberOfThreads.value + " output." + containerFormat.value;
    outputBox.textContent = output;
}

function generateSimpleTranscodeCommand() {
    const simpleOutputBox = document.getElementById('output-box');
    const fileName = document.getElementById("input-file-name");
    let fullFileName = `"`+ fileName.value + `"`;
    const codingFormat = document.querySelector('input[name="select-coding-format"]:checked');
    const containerFormat = document.querySelector('input[name="select-container"]:checked');
    const transcodingQuality = document.getElementById("quality");
    if (transcodingQuality.value > 51) {
        transcodingQuality.value = 51;
        alert('Transcoding Quality should be at least 0, and cannot be more than 51');
    }
    else if (transcodingQuality.value < 0) {
        transcodingQuality.value = 0;
        alert('Transcoding Quality should be at least 0, and cannot be more than 51');
    }
    let output;
    if (codingFormat.id === "av1") {
        // ffmpeg -i input.mp4 -c:v libsvtav1 -preset 8 -crf 30 output.mkv
        output = "ffmpeg -i " + fullFileName + " -c:v libsvtav1 -crf " + transcodingQuality.value + " -preset 8 -c:a aac -b:a 320k -movflags +faststart -threads 4 output." + containerFormat.value;
    } else if (codingFormat.id === "hvac") {
        output = "ffmpeg -i " + fullFileName + " -c:v libx265 -crf " + transcodingQuality.value + " -c:a aac -b:a 320k -movflags +faststart -threads 4 output." + containerFormat.value;
    } else if (codingFormat.id === "avc") {
        output = "ffmpeg -i " + fullFileName + " -c:v libx264 -crf " + transcodingQuality.value + " -c:a aac -b:a 320k -movflags +faststart -threads 4 output." + containerFormat.value;
    }
    simpleOutputBox.textContent = output;
}

function copyText() {
    const outputBox = document.getElementById('output-box');
    const textToCopy = outputBox.textContent;
    const tempInput = document.createElement('textarea');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();

    try {
        document.execCommand('copy');
        alert('Command Copied!!!');
    } catch (err) {
        alert('Failed to Copy the command, please copy it by hand!');
    }

    document.body.removeChild(tempInput);
}

function generateCommand(modeID) {
    if (modeID == 0) {
        generateCopyCommand();
    }
    else if (modeID == 1) {
        generateSimpleTranscodeCommand();
    }
    else if (modeID == 2) {
        generateTranscodeCommand();
    }
}