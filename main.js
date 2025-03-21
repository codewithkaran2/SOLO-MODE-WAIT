// main.js
(function() {
  "use strict";

  // Utility function to load a script dynamically with error handling.
  function loadScript(url, callback) {
    var script = document.createElement("script");
    script.src = url;
    script.defer = true;
    script.onload = callback;
    script.onerror = function() {
      console.error("Failed to load script: " + url);
    };
    document.body.appendChild(script);
  }

  // Generic function to start any game mode by loading its script and calling its initializer.
  function startMode(scriptUrl, startFunctionName) {
    loadScript(scriptUrl, function() {
      var startFunc = window[startFunctionName];
      if (typeof startFunc === "function") {
        startFunc();
      } else {
        console.error("Function " + startFunctionName + " not found.");
      }
    });
  }

  // Survival Mode: Hides second-player controls and loads survivalMode.js
  function startSurvivalMode() {
    // Hide Player 2's control box if it exists
    var playerControls = document.getElementById("playerControls");
    if (playerControls) {
      var controlBoxes = playerControls.querySelectorAll(".control-box");
      if (controlBoxes.length > 1) {
        controlBoxes[1].style.display = "none";
      }
    }
    // Hide Player 2's name input
    var p2Input = document.getElementById("p2Name");
    if (p2Input) {
      p2Input.style.display = "none";
    }
    // Load survival mode script and start the game
    startMode("survivalMode.js", "survivalStartGame");
  }

  // Expose the survival mode function globally so it can be called by event listeners or external scripts.
  window.startSurvivalMode = startSurvivalMode;

  // Dummy implementations for game control functions (replace these with your actual game logic)
  window.toggleFullScreen = function() {
    console.log("Full screen toggled.");
  };

  window.togglePause = function() {
    console.log("Pause toggled.");
  };

  window.restartGame = function() {
    console.log("Game restarted.");
  };

  window.playAgain = function() {
    console.log("Play again triggered.");
  };

  // Attach event listeners when the DOM content is loaded.
  document.addEventListener("DOMContentLoaded", function() {
    // Duo Mode button event listener
    var duoBtn = document.getElementById("duoButton");
    if (duoBtn) {
      duoBtn.addEventListener("click", function() {
        if (typeof window.duoStartGame === "function") {
          window.duoStartGame();
        } else {
          console.error("duoStartGame function not found.");
        }
      });
    }

    // Survival Mode button event listener
    var survivalBtn = document.getElementById("survivalButton");
    if (survivalBtn) {
      survivalBtn.addEventListener("click", function() {
        if (typeof window.startSurvivalMode === "function") {
          window.startSurvivalMode();
        } else {
          console.error("startSurvivalMode function not found.");
        }
      });
    }

    // Start Game button (if applicable)
    var startGameBtn = document.getElementById("startGameButton");
    if (startGameBtn) {
      startGameBtn.addEventListener("click", function() {
        if (typeof window.duoStartGame === "function") {
          window.duoStartGame();
        } else {
          console.error("duoStartGame function not found.");
        }
      });
    }

    // Attach additional game control event listeners
    var fullScreenBtn = document.getElementById("fullScreenButton");
    if (fullScreenBtn) {
      fullScreenBtn.addEventListener("click", window.toggleFullScreen);
    }
    var pauseBtn = document.getElementById("pauseButton");
    if (pauseBtn) {
      pauseBtn.addEventListener("click", window.togglePause);
    }
    var restartBtn = document.getElementById("restartButton");
    if (restartBtn) {
      restartBtn.addEventListener("click", window.restartGame);
    }
    var playAgainBtn = document.getElementById("playAgainButton");
    if (playAgainBtn) {
      playAgainBtn.addEventListener("click", window.playAgain);
    }
    var resumeBtn = document.getElementById("resumeButton");
    if (resumeBtn) {
      resumeBtn.addEventListener("click", window.togglePause);
    }
    var playAgainGameBtn = document.getElementById("playAgainGameButton");
    if (playAgainGameBtn) {
      playAgainGameBtn.addEventListener("click", window.playAgain);
    }
  });
})();
