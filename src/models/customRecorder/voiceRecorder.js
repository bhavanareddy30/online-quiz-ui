function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var microphone = require("./microphone~pFtSEjGu.png");

var stopIcon = require("./stop~lbXSmHgG.png");

var pauseIcons = require("./pause~xDleoKju.png");

var playIcons = require("./play-button~KMZeLnuO.png");

var closeIcons = require("./close~bbahVpKh.png");

var styles = {"recorder_library_box":"_1ceqH","recorder_box":"_2fG9h","recorder_box_inner":"_dt3-T","mic_icon":"_1dpop","reco_header":"_1lB9c","h2":"_2N9dq","close_icons":"_3-aC9","record_section":"_3bC73","duration_section":"_1YOWG","btn_wrapper":"_1Yplu","btn":"_1Pz2d","clear_btn":"_2gd2_","duration":"_f2DT8","recorder_page_box":"_17RTH","help":"_eV_dK","record_controller":"_qxztz","icons":"_2uz65","stop":"_1bSom","pause":"_3nQu5"};

var audioType = "audio/*";

var Recorder = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Recorder, _Component);

  function Recorder(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      time: {},
      seconds: 0,
      isPaused: false,
      recording: false,
      medianotFound: false,
      audios: [],
      audioBlob: null
    };
    _this.timer = 0;
    _this.startTimer = _this.startTimer.bind(_assertThisInitialized(_this));
    _this.countDown = _this.countDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Recorder.prototype;

  _proto.handleAudioPause = function handleAudioPause(e) {
    e.preventDefault();
    clearInterval(this.timer);
    this.mediaRecorder.pause();
    this.setState({
      pauseRecord: true
    });
  };

  _proto.handleAudioStart = function handleAudioStart(e) {
    e.preventDefault();
    this.startTimer();
    this.mediaRecorder.resume();
    this.setState({
      pauseRecord: false
    });
  };

  _proto.startTimer = function startTimer() {
    this.timer = setInterval(this.countDown, 1000);
  };

  _proto.countDown = function countDown() {
    var seconds = this.state.seconds + 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
  };

  _proto.secondsToTime = function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    var obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  };

  _proto.componentDidMount = function componentDidMount() {
    try {
      var _this3 = this;

      console.log(navigator.mediaDevices);
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

      var _temp2 = function () {
        if (navigator.mediaDevices) {
          return Promise.resolve(navigator.mediaDevices.getUserMedia({
            audio: true
          })).then(function (stream) {
            _this3.mediaRecorder = new MediaRecorder(stream);
            _this3.chunks = [];

            _this3.mediaRecorder.ondataavailable = function (e) {
              if (e.data && e.data.size > 0) {
                _this3.chunks.push(e.data);
              }
            };
          });
        } else {
          _this3.setState({
            medianotFound: true
          });

          console.log("Media Decives will work only with SSL.....");
        }
      }();

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.startRecording = function startRecording(e) {
    e.preventDefault();
    this.chunks = [];
    this.mediaRecorder.start(10);
    this.startTimer();
    this.setState({
      recording: true
    });
    this.props.handleStart();
  };

  _proto.stopRecording = function stopRecording(e) {
    clearInterval(this.timer);
    this.setState({
      time: {}
    });
    e.preventDefault();
    this.mediaRecorder.stop();
    this.setState({
      recording: false
    });
    this.saveAudio();
  };

  _proto.handleRest = function handleRest() {
    if(this.state.recording) {
      alert("Please click on the stop button and then clear the recorded audio")
      return;
    };
    this.setState({
      time: {},
      seconds: 0,
      isPaused: false,
      recording: false,
      medianotFound: false,
      audios: [],
      audioBlob: null
    });
    this.props.handleRest(this.state);
  };

  _proto.saveAudio = function saveAudio() {
    var blob = new Blob(this.chunks, {
      type: audioType
    });
    var audioURL = window.URL.createObjectURL(blob);
    var audios = [audioURL];
    this.setState({
      audios: audios,
      audioBlob: blob
    });
    this.props.handleAudioStop({
      url: audioURL,
      blob: blob,
      chunks: this.chunks,
      duration: this.state.time
    });
  };

  _proto.render = function render() {
    var _this4 = this;

    var _this$state = this.state,
        recording = _this$state.recording,
        audios = _this$state.audios,
        time = _this$state.time,
        medianotFound = _this$state.medianotFound,
        pauseRecord = _this$state.pauseRecord;
    var _this$props = this.props,
        showUIAudio = _this$props.showUIAudio,
        title = _this$props.title,
        audioURL = _this$props.audioURL;
    return /*#__PURE__*/React__default.createElement("div", {
      className: styles.recorder_library_box
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles.recorder_box
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles.recorder_box_inner
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles.reco_header
    }, /*#__PURE__*/React__default.createElement("h2", {
      className: styles.h2
    }, title), /*#__PURE__*/React__default.createElement("span", {
      className: styles.close_icons
    }, /*#__PURE__*/React__default.createElement("img", {
      src: closeIcons,
      width: 20,
      height: 20,
      alt: "Close icons"
    }))), !medianotFound ? /*#__PURE__*/React__default.createElement("div", {
      className: styles.record_section
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles.btn_wrapper
    }, /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick() {
        return _this4.props.handleAudioUpload(_this4.state.audioBlob);
      },
      className: styles.btn + " upload-btn " + styles.upload_btn
    }, "Upload"), /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick() {
        return _this4.handleRest();
      },
      className: styles.btn + " " + styles.clear_btn
    }, "Clear")), /*#__PURE__*/React__default.createElement("div", {
      className: styles.duration_section
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles.audio_section
    }, audioURL !== null && showUIAudio ? /*#__PURE__*/React__default.createElement("audio", {
      controls: true
    }, /*#__PURE__*/React__default.createElement("source", {
      src: audios[0],
      type: "audio/ogg"
    }), /*#__PURE__*/React__default.createElement("source", {
      src: audios[0],
      type: "audio/mpeg"
    })) : null), /*#__PURE__*/React__default.createElement("div", {
      className: styles.duration
    }, /*#__PURE__*/React__default.createElement("span", {
      className: styles.mins
    }, time.m !== undefined ? "" + (time.m <= 9 ? "0" + time.m : time.m) : "00"), /*#__PURE__*/React__default.createElement("span", {
      className: styles.divider
    }, ":"), /*#__PURE__*/React__default.createElement("span", {
      className: styles.secs
    }, time.s !== undefined ? "" + (time.s <= 9 ? "0" + time.s : time.s) : "00")), !recording ? /*#__PURE__*/React__default.createElement("p", {
      className: styles.help
    }, "Press the microphone to record") : null), !recording ? /*#__PURE__*/React__default.createElement("a", {
      onClick: function onClick(e) {
        return _this4.startRecording(e);
      },
      href: " #",
      className: styles.mic_icon
    }, /*#__PURE__*/React__default.createElement("img", {
      src: microphone,
      width: 30,
      height: 30,
      alt: "Microphone icons"
    })) : /*#__PURE__*/React__default.createElement("div", {
      className: styles.record_controller
    }, /*#__PURE__*/React__default.createElement("a", {
      onClick: function onClick(e) {
        return _this4.stopRecording(e);
      },
      href: " #",
      className: styles.icons + " " + styles.stop
    }, /*#__PURE__*/React__default.createElement("img", {
      src: stopIcon,
      width: 20,
      height: 20,
      alt: "Stop icons"
    })), /*#__PURE__*/React__default.createElement("a", {
      onClick: !pauseRecord ? function (e) {
        return _this4.handleAudioPause(e);
      } : function (e) {
        return _this4.handleAudioStart(e);
      },
      href: " #",
      className: styles.icons + " " + styles.pause
    }, pauseRecord ? /*#__PURE__*/React__default.createElement("img", {
      src: playIcons,
      width: 20,
      height: 20,
      alt: "Play icons"
    }) : /*#__PURE__*/React__default.createElement("img", {
      src: pauseIcons,
      width: 20,
      height: 20,
      alt: "Pause icons"
    })))) : /*#__PURE__*/React__default.createElement("p", {
      style: {
        color: "#fff",
        marginTop: 30,
        fontSize: 25
      }
    }, "Seems the site is Non-SSL"))));
  };

  return Recorder;
}(React.Component);

exports.Recorder = Recorder;
//# sourceMappingURL=index.js.map
