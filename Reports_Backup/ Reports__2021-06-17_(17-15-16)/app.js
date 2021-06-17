var app = angular.module('reportingApp', []);

//<editor-fold desc="global helpers">

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};
var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
    } else if (getSpec(item.description) !== getSpec(prevItem.description)) {
        item.displaySpecName = true;
    }
};

var getParent = function (str) {
    var arr = str.split('|');
    str = "";
    for (var i = arr.length - 2; i > 0; i--) {
        str += arr[i] + " > ";
    }
    return str.slice(0, -3);
};

var getShortDescription = function (str) {
    return str.split('|')[0];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};

var convertTimestamp = function (timestamp) {
    var d = new Date(timestamp),
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),
        dd = ('0' + d.getDate()).slice(-2),
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh === 0) {
        h = 12;
    }

    // ie: 2013-02-18, 8:35 AM
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

    return time;
};

var defaultSortFunction = function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) {
        return -1;
    } else if (a.sessionId > b.sessionId) {
        return 1;
    }

    if (a.timestamp < b.timestamp) {
        return -1;
    } else if (a.timestamp > b.timestamp) {
        return 1;
    }

    return 0;
};

//</editor-fold>

app.controller('ScreenshotReportController', ['$scope', '$http', 'TitleService', function ($scope, $http, titleService) {
    var that = this;
    var clientDefaults = {
    "showTotalDurationIn": "header",
    "totalDurationFormat": "h:m:s",
    "gatherBrowserLogs": true,
    "columnSettings": {
        "displayTime": true,
        "displayBrowser": true,
        "displaySessionId": false,
        "displayOS": true,
        "inlineScreenshots": true
    }
};

    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, clientDefaults.searchSettings || {}); // enable customisation of search settings on first page hit

    this.warningTime = 1400;
    this.dangerTime = 1900;
    this.totalDurationFormat = clientDefaults.totalDurationFormat;
    this.showTotalDurationIn = clientDefaults.showTotalDurationIn;

    var initialColumnSettings = clientDefaults.columnSettings; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        } else {
            this.inlineScreenshots = false;
        }
        if (initialColumnSettings.warningTime) {
            this.warningTime = initialColumnSettings.warningTime;
        }
        if (initialColumnSettings.dangerTime) {
            this.dangerTime = initialColumnSettings.dangerTime;
        }
    }


    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        return getParent(str);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };

    this.getShortDescription = function (str) {
        return getShortDescription(str);
    };
    this.hasNextScreenshot = function (index) {
        var old = index;
        return old !== this.getNextScreenshotIdx(index);
    };

    this.hasPreviousScreenshot = function (index) {
        var old = index;
        return old !== this.getPreviousScreenshotIdx(index);
    };
    this.getNextScreenshotIdx = function (index) {
        var next = index;
        var hit = false;
        while (next + 2 < this.results.length) {
            next++;
            if (this.results[next].screenShotFile && !this.results[next].pending) {
                hit = true;
                break;
            }
        }
        return hit ? next : index;
    };

    this.getPreviousScreenshotIdx = function (index) {
        var prev = index;
        var hit = false;
        while (prev > 0) {
            prev--;
            if (this.results[prev].screenShotFile && !this.results[prev].pending) {
                hit = true;
                break;
            }
        }
        return hit ? prev : index;
    };

    this.convertTimestamp = convertTimestamp;


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };

    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.totalDuration = function () {
        var sum = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.duration) {
                sum += result.duration;
            }
        }
        return sum;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };


    var results = [
    {
        "description": "login valid user|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\002a009f-0008-00c4-008f-00bd0082003c.png",
        "timestamp": 1623929350992,
        "duration": 8639
    },
    {
        "description": "Verify Power BI files visibility|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\00d700a1-0061-008e-004f-004b00160068.png",
        "timestamp": 1623929359928,
        "duration": 17015
    },
    {
        "description": "Verify Current date with Dashboard date|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00020037-000e-0085-004f-003300b500dd.png",
        "timestamp": 1623929377180,
        "duration": 18101
    },
    {
        "description": "Verify Completed % of Active Users not exceeding 100%|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\0084002f-0084-008a-0007-004500a000ac.png",
        "timestamp": 1623929395659,
        "duration": 6682
    },
    {
        "description": "Verify active user should be less than register user|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00fb00f1-00ac-002e-0054-00b500bf00f1.png",
        "timestamp": 1623929402704,
        "duration": 104
    },
    {
        "description": "registered users and active users are different|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00990061-0092-00fe-0042-00db0046003d.png",
        "timestamp": 1623929403105,
        "duration": 80
    },
    {
        "description": "Verify user completion not blank|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\0002009f-00ce-00c4-004f-006300de0010.png",
        "timestamp": 1623929403433,
        "duration": 18385
    },
    {
        "description": "Verify Go-Do tab|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00480023-00e9-000d-008e-0091007a0092.png",
        "timestamp": 1623929422027,
        "duration": 8390
    },
    {
        "description": "Verify if Participants is blank under POD|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\006a00c0-009f-0022-00d9-00b9003000f1.png",
        "timestamp": 1623929430598,
        "duration": 8915
    },
    {
        "description": "Verify blank drop downs in tracking user progress page|Dashboard Sanity Suite",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": [
            "Failed: Blank is present in select division",
            "Failed: Blank is present in select job level",
            "Failed: Blank is present in Employee status",
            "Failed: Blank is present in work location",
            "Failed: Blank is present in Work state",
            "Failed: Blank is present in Work region"
        ],
        "trace": [
            "Error: Failed: Blank is present in select division\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:181:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in select job level\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:195:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in Employee status\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:209:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in work location\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:223:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in Work state\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:237:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in Work region\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:251:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00bb0021-00f4-00bc-00b2-0094009900b0.png",
        "timestamp": 1623929439753,
        "duration": 39179
    },
    {
        "description": "Verify blank drop downs in Dashboard tab|Dashboard Sanity Suite",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": [
            "Failed: element click intercepted: Element <div class=\"slicer-restatement\">...</div> is not clickable at point (188, 427). Other element would receive the click: <div class=\"scrollbar-inner scroll-content\" style=\"height: 200px; margin-bottom: 0px; margin-right: 0px; max-height: none;\">...</div>\n  (Session info: chrome=91.0.4472.106)\n  (Driver info: chromedriver=91.0.4472.19 (1bf021f248676a0b2ab3ee0561d83a59e424c23e-refs/branch-heads/4472@{#288}),platform=Windows NT 10.0.19042 x86_64)"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <div class=\"slicer-restatement\">...</div> is not clickable at point (188, 427). Other element would receive the click: <div class=\"scrollbar-inner scroll-content\" style=\"height: 200px; margin-bottom: 0px; margin-right: 0px; max-height: none;\">...</div>\n  (Session info: chrome=91.0.4472.106)\n  (Driver info: chromedriver=91.0.4472.19 (1bf021f248676a0b2ab3ee0561d83a59e424c23e-refs/branch-heads/4472@{#288}),platform=Windows NT 10.0.19042 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\http.js:441:30\n    at runMicrotasks (<anonymous>)\n    at processTicksAndRejections (internal/process/task_queues.js:97:5)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\built\\element.js:461:65\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.<computed> [as click] (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.<computed> [as click] (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\built\\element.js:831:22)\n    at scenario.Verify_blank_drop_down_all_tabs (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:200:37)\n    at scenario.Verify_Blank_in_all_drop_down_Dashboard (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:263:14)\n    at UserContext.<anonymous> (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Journey_PowerBi_Dashboard.js:48:13)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Verify blank drop downs in Dashboard tab\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Journey_PowerBi_Dashboard.js:47:5)\n    at addSpecsToSuite (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Journey_PowerBi_Dashboard.js:12:1)\n    at Module._compile (internal/modules/cjs/loader.js:1138:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1158:10)\n    at Module.load (internal/modules/cjs/loader.js:986:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:879:14)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00da001a-0043-00d9-0072-003400a4009e.png",
        "timestamp": 1623929479164,
        "duration": 20730
    },
    {
        "description": "Verify blank dropdown in pods tab|Dashboard Sanity Suite",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": [
            "Failed: Blank is present in select division",
            "Failed: Blank is present in select job level",
            "Failed: Blank is present in Employee status",
            "Failed: Blank is present in work location",
            "Failed: Blank is present in Work state",
            "Failed: Blank is present in Work region"
        ],
        "trace": [
            "Error: Failed: Blank is present in select division\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:181:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in select job level\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:195:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in Employee status\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:209:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in work location\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:223:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in Work state\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:237:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in Work region\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:251:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00b700d8-0005-00e7-00ab-001e009500b7.png",
        "timestamp": 1623929500150,
        "duration": 38448
    },
    {
        "description": "Verify blank dropdown in Sustainable Dashboard tab|Dashboard Sanity Suite",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": [
            "Failed: Blank is present in select division",
            "Failed: Blank is present in select job level",
            "Failed: Blank is present in Employee status",
            "Failed: Blank is present in work location",
            "Failed: Blank is present in Work state",
            "Failed: Blank is present in Work region"
        ],
        "trace": [
            "Error: Failed: Blank is present in select division\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:181:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in select job level\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:195:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in Employee status\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:209:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in work location\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:223:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in Work state\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:237:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)",
            "Error: Failed: Blank is present in Work region\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:251:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\008600ed-0055-0085-005d-00ff008b00cb.png",
        "timestamp": 1623929538806,
        "duration": 38473
    },
    {
        "description": "verify Email id in participants list|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00080073-008c-000d-0038-006000cc00bb.png",
        "timestamp": 1623929577549,
        "duration": 35681
    },
    {
        "description": "verify successful login to wonderful company|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "images\\001100b6-00d7-00fe-00e7-00ac003a00a7.png",
        "timestamp": 1623929613504,
        "duration": 8327
    },
    {
        "description": "verify power BI files visibility (WC)|Dashboard Sanity Suite",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //*[@style=\"width: 262.768px; height: 17.4539px;\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //*[@style=\"width: 262.768px; height: 17.4539px;\"])\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\built\\element.js:814:27\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at runMicrotasks (<anonymous>)\n    at processTicksAndRejections (internal/process/task_queues.js:97:5)\nFrom: Task: WebDriver.switchTo().frame([object Object])\n    at thenableWebDriverProxy.schedule (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at TargetLocator.frame (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\webdriver.js:1824:25)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Journey_PowerBi_Dashboard.js:70:45\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\built\\element.js:804:32\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at runMicrotasks (<anonymous>)\nFrom: Task: Run it(\"verify power BI files visibility (WC)\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Journey_PowerBi_Dashboard.js:66:5)\n    at addSpecsToSuite (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Journey_PowerBi_Dashboard.js:12:1)\n    at Module._compile (internal/modules/cjs/loader.js:1138:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1158:10)\n    at Module.load (internal/modules/cjs/loader.js:986:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:879:14)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00db0007-00e9-00d8-00cc-00eb00690069.png",
        "timestamp": 1623929622049,
        "duration": 65414
    },
    {
        "description": "Compare date (WC)|Dashboard Sanity Suite",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //*[@id=\"sandbox-host\"]//p//*[@title=\"Dashboard Last Updated on\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //*[@id=\"sandbox-host\"]//p//*[@title=\"Dashboard Last Updated on\"])\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\built\\element.js:814:27\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at runMicrotasks (<anonymous>)\n    at processTicksAndRejections (internal/process/task_queues.js:97:5)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.<computed> [as getText] (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.<computed> [as getText] (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\built\\element.js:831:22)\n    at scenario.Compare_current_date (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_Dashboard.js:56:24)\n    at UserContext.<anonymous> (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Journey_PowerBi_Dashboard.js:74:13)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"Compare date (WC)\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Journey_PowerBi_Dashboard.js:73:5)\n    at addSpecsToSuite (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Journey_PowerBi_Dashboard.js:12:1)\n    at Module._compile (internal/modules/cjs/loader.js:1138:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1158:10)\n    at Module.load (internal/modules/cjs/loader.js:986:32)\n    at Function.Module._load (internal/modules/cjs/loader.js:879:14)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\0061007f-0051-00af-0029-007d00a400ae.png",
        "timestamp": 1623929687681,
        "duration": 60063
    },
    {
        "description": "Verify active user should be less than register user(WC)|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\003100e4-00ff-00b3-00f0-00e2006b00c6.png",
        "timestamp": 1623929748009,
        "duration": 109
    },
    {
        "description": "registered users and active users are different(WC)|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00020007-00ee-00bc-0082-00cb007600d9.png",
        "timestamp": 1623929748368,
        "duration": 61
    },
    {
        "description": "Verify user completion not blank(WC)|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00b2009c-00d7-00cf-008f-00d500300029.png",
        "timestamp": 1623929748655,
        "duration": 42216
    },
    {
        "description": "Verify blank in Main Dashboard(WC)|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\0085006a-0052-0096-00b8-0076001a000f.png",
        "timestamp": 1623929791113,
        "duration": 2079
    },
    {
        "description": "Verify blank under tracking user progress tab(WC)|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\00fe0018-0001-00d5-001e-000a00630057.png",
        "timestamp": 1623929793559,
        "duration": 41606
    },
    {
        "description": "Verify blank under PODS tab on landing page(WC)|Dashboard Sanity Suite",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": [
            "Failed: Blank text is present in landing page tabs",
            "Failed: Blank text is present in the landing page checkboxes"
        ],
        "trace": [
            "Error: Failed: Blank text is present in landing page tabs\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at scenario_wc.Verify_blank (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_WC.js:96:13)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_WC.js:142:19\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\built\\element.js:804:32\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)",
            "Error: Failed: Blank text is present in the landing page checkboxes\n    at stack (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2338:17)\n    at buildExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:2308:14)\n    at Spec.expectationResultFactory (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:858:18)\n    at Spec.addExpectationResult (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:487:34)\n    at Env.fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1286:25)\n    at fail (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4558:23)\n    at C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\ConvertedJS\\Scenario_PowerBI_WC.js:153:21\n    at ManagedPromise.invokeCallback_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\JAINAM SHAH\\Documents\\GitHubb\\Momenta-Framework\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00880019-00f7-0093-0072-00c1007b0095.png",
        "timestamp": 1623929835379,
        "duration": 6776
    },
    {
        "description": "Verify Email id under participant list(WC)|Dashboard Sanity Suite",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "sessionId": "78ff81a97866a165b82b745dc6fa8423",
        "instanceId": 26056,
        "browser": {
            "name": "chrome",
            "version": "91.0.4472.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\0049003a-0073-0006-0072-005c00930014.png",
        "timestamp": 1623929842330,
        "duration": 32058
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});

    };

    this.setTitle = function () {
        var title = $('.report-title').text();
        titleService.setTitle(title);
    };

    // is run after all test data has been prepared/loaded
    this.afterLoadingJobs = function () {
        this.sortSpecs();
        this.setTitle();
    };

    this.loadResultsViaAjax = function () {

        $http({
            url: './combined.json',
            method: 'GET'
        }).then(function (response) {
                var data = null;
                if (response && response.data) {
                    if (typeof response.data === 'object') {
                        data = response.data;
                    } else if (response.data[0] === '"') { //detect super escaped file (from circular json)
                        data = CircularJSON.parse(response.data); //the file is escaped in a weird way (with circular json)
                    } else {
                        data = JSON.parse(response.data);
                    }
                }
                if (data) {
                    results = data;
                    that.afterLoadingJobs();
                }
            },
            function (error) {
                console.error(error);
            });
    };


    if (clientDefaults.useAjax) {
        this.loadResultsViaAjax();
    } else {
        this.afterLoadingJobs();
    }

}]);

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        if (!items) {
            return filtered; // to avoid crashing in where results might be empty
        }
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            var isHit = false; //is set to true if any of the search criteria matched
            countLogMessages(item); // modifies item contents

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    isHit = true;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    isHit = true;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    isHit = true;
                }
            }
            if (isHit) {
                checkIfShouldDisplaySpecName(prevItem, item);

                filtered.push(item);
                prevItem = item;
            }
        }

        return filtered;
    };
});

//formats millseconds to h m s
app.filter('timeFormat', function () {
    return function (tr, fmt) {
        if(tr == null){
            return "NaN";
        }

        switch (fmt) {
            case 'h':
                var h = tr / 1000 / 60 / 60;
                return "".concat(h.toFixed(2)).concat("h");
            case 'm':
                var m = tr / 1000 / 60;
                return "".concat(m.toFixed(2)).concat("min");
            case 's' :
                var s = tr / 1000;
                return "".concat(s.toFixed(2)).concat("s");
            case 'hm':
            case 'h:m':
                var hmMt = tr / 1000 / 60;
                var hmHr = Math.trunc(hmMt / 60);
                var hmMr = hmMt - (hmHr * 60);
                if (fmt === 'h:m') {
                    return "".concat(hmHr).concat(":").concat(hmMr < 10 ? "0" : "").concat(Math.round(hmMr));
                }
                return "".concat(hmHr).concat("h ").concat(hmMr.toFixed(2)).concat("min");
            case 'hms':
            case 'h:m:s':
                var hmsS = tr / 1000;
                var hmsHr = Math.trunc(hmsS / 60 / 60);
                var hmsM = hmsS / 60;
                var hmsMr = Math.trunc(hmsM - hmsHr * 60);
                var hmsSo = hmsS - (hmsHr * 60 * 60) - (hmsMr*60);
                if (fmt === 'h:m:s') {
                    return "".concat(hmsHr).concat(":").concat(hmsMr < 10 ? "0" : "").concat(hmsMr).concat(":").concat(hmsSo < 10 ? "0" : "").concat(Math.round(hmsSo));
                }
                return "".concat(hmsHr).concat("h ").concat(hmsMr).concat("min ").concat(hmsSo.toFixed(2)).concat("s");
            case 'ms':
                var msS = tr / 1000;
                var msMr = Math.trunc(msS / 60);
                var msMs = msS - (msMr * 60);
                return "".concat(msMr).concat("min ").concat(msMs.toFixed(2)).concat("s");
        }

        return tr;
    };
});


function PbrStackModalController($scope, $rootScope) {
    var ctrl = this;
    ctrl.rootScope = $rootScope;
    ctrl.getParent = getParent;
    ctrl.getShortDescription = getShortDescription;
    ctrl.convertTimestamp = convertTimestamp;
    ctrl.isValueAnArray = isValueAnArray;
    ctrl.toggleSmartStackTraceHighlight = function () {
        var inv = !ctrl.rootScope.showSmartStackTraceHighlight;
        ctrl.rootScope.showSmartStackTraceHighlight = inv;
    };
    ctrl.applySmartHighlight = function (line) {
        if ($rootScope.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return '';
    };
}


app.component('pbrStackModal', {
    templateUrl: "pbr-stack-modal.html",
    bindings: {
        index: '=',
        data: '='
    },
    controller: PbrStackModalController
});

function PbrScreenshotModalController($scope, $rootScope) {
    var ctrl = this;
    ctrl.rootScope = $rootScope;
    ctrl.getParent = getParent;
    ctrl.getShortDescription = getShortDescription;

    /**
     * Updates which modal is selected.
     */
    this.updateSelectedModal = function (event, index) {
        var key = event.key; //try to use non-deprecated key first https://developer.mozilla.org/de/docs/Web/API/KeyboardEvent/keyCode
        if (key == null) {
            var keyMap = {
                37: 'ArrowLeft',
                39: 'ArrowRight'
            };
            key = keyMap[event.keyCode]; //fallback to keycode
        }
        if (key === "ArrowLeft" && this.hasPrevious) {
            this.showHideModal(index, this.previous);
        } else if (key === "ArrowRight" && this.hasNext) {
            this.showHideModal(index, this.next);
        }
    };

    /**
     * Hides the modal with the #oldIndex and shows the modal with the #newIndex.
     */
    this.showHideModal = function (oldIndex, newIndex) {
        const modalName = '#imageModal';
        $(modalName + oldIndex).modal("hide");
        $(modalName + newIndex).modal("show");
    };

}

app.component('pbrScreenshotModal', {
    templateUrl: "pbr-screenshot-modal.html",
    bindings: {
        index: '=',
        data: '=',
        next: '=',
        previous: '=',
        hasNext: '=',
        hasPrevious: '='
    },
    controller: PbrScreenshotModalController
});

app.factory('TitleService', ['$document', function ($document) {
    return {
        setTitle: function (title) {
            $document[0].title = title;
        }
    };
}]);


app.run(
    function ($rootScope, $templateCache) {
        //make sure this option is on by default
        $rootScope.showSmartStackTraceHighlight = true;
        
  $templateCache.put('pbr-screenshot-modal.html',
    '<div class="modal" id="imageModal{{$ctrl.index}}" tabindex="-1" role="dialog"\n' +
    '     aria-labelledby="imageModalLabel{{$ctrl.index}}" ng-keydown="$ctrl.updateSelectedModal($event,$ctrl.index)">\n' +
    '    <div class="modal-dialog modal-lg m-screenhot-modal" role="document">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modal-header">\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '                    <span aria-hidden="true">&times;</span>\n' +
    '                </button>\n' +
    '                <h6 class="modal-title" id="imageModalLabelP{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getParent($ctrl.data.description)}}</h6>\n' +
    '                <h5 class="modal-title" id="imageModalLabel{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getShortDescription($ctrl.data.description)}}</h5>\n' +
    '            </div>\n' +
    '            <div class="modal-body">\n' +
    '                <img class="screenshotImage" ng-src="{{$ctrl.data.screenShotFile}}">\n' +
    '            </div>\n' +
    '            <div class="modal-footer">\n' +
    '                <div class="pull-left">\n' +
    '                    <button ng-disabled="!$ctrl.hasPrevious" class="btn btn-default btn-previous" data-dismiss="modal"\n' +
    '                            data-toggle="modal" data-target="#imageModal{{$ctrl.previous}}">\n' +
    '                        Prev\n' +
    '                    </button>\n' +
    '                    <button ng-disabled="!$ctrl.hasNext" class="btn btn-default btn-next"\n' +
    '                            data-dismiss="modal" data-toggle="modal"\n' +
    '                            data-target="#imageModal{{$ctrl.next}}">\n' +
    '                        Next\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '                <a class="btn btn-primary" href="{{$ctrl.data.screenShotFile}}" target="_blank">\n' +
    '                    Open Image in New Tab\n' +
    '                    <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>\n' +
    '                </a>\n' +
    '                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
     ''
  );

  $templateCache.put('pbr-stack-modal.html',
    '<div class="modal" id="modal{{$ctrl.index}}" tabindex="-1" role="dialog"\n' +
    '     aria-labelledby="stackModalLabel{{$ctrl.index}}">\n' +
    '    <div class="modal-dialog modal-lg m-stack-modal" role="document">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modal-header">\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '                    <span aria-hidden="true">&times;</span>\n' +
    '                </button>\n' +
    '                <h6 class="modal-title" id="stackModalLabelP{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getParent($ctrl.data.description)}}</h6>\n' +
    '                <h5 class="modal-title" id="stackModalLabel{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getShortDescription($ctrl.data.description)}}</h5>\n' +
    '            </div>\n' +
    '            <div class="modal-body">\n' +
    '                <div ng-if="$ctrl.data.trace.length > 0">\n' +
    '                    <div ng-if="$ctrl.isValueAnArray($ctrl.data.trace)">\n' +
    '                        <pre class="logContainer" ng-repeat="trace in $ctrl.data.trace track by $index"><div ng-class="$ctrl.applySmartHighlight(line)" ng-repeat="line in trace.split(\'\\n\') track by $index">{{line}}</div></pre>\n' +
    '                    </div>\n' +
    '                    <div ng-if="!$ctrl.isValueAnArray($ctrl.data.trace)">\n' +
    '                        <pre class="logContainer"><div ng-class="$ctrl.applySmartHighlight(line)" ng-repeat="line in $ctrl.data.trace.split(\'\\n\') track by $index">{{line}}</div></pre>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div ng-if="$ctrl.data.browserLogs.length > 0">\n' +
    '                    <h5 class="modal-title">\n' +
    '                        Browser logs:\n' +
    '                    </h5>\n' +
    '                    <pre class="logContainer"><div class="browserLogItem"\n' +
    '                                                   ng-repeat="logError in $ctrl.data.browserLogs track by $index"><div><span class="label browserLogLabel label-default"\n' +
    '                                                                                                                             ng-class="{\'label-danger\': logError.level===\'SEVERE\', \'label-warning\': logError.level===\'WARNING\'}">{{logError.level}}</span><span class="label label-default">{{$ctrl.convertTimestamp(logError.timestamp)}}</span><div ng-repeat="messageLine in logError.message.split(\'\\\\n\') track by $index">{{ messageLine }}</div></div></div></pre>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="modal-footer">\n' +
    '                <button class="btn btn-default"\n' +
    '                        ng-class="{active: $ctrl.rootScope.showSmartStackTraceHighlight}"\n' +
    '                        ng-click="$ctrl.toggleSmartStackTraceHighlight()">\n' +
    '                    <span class="glyphicon glyphicon-education black"></span> Smart Stack Trace\n' +
    '                </button>\n' +
    '                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
     ''
  );

    });
