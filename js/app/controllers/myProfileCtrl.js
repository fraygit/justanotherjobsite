
angular.module('jajsApp').controller('MyProfileController', ['$scope', '$http', 'UserService', '$state', '$rootScope', '$sce', function ($scope, $http, UserService, $state, $rootScope, $sce) {
    var userDetails = UserService.get();
    if (userDetails.token != '' && userDetails.token != undefined) {

        tinymce.init({
            selector: '#description',
            height: 500,
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            content_css: [
              '//fast.fonts.net/cssapi/e6dc9b99-64fe-4292-ad98-6974f93cd2a2.css',
              '//www.tinymce.com/css/codepen.min.css'
            ]
        });

        $scope.Profile = {};
        $scope.ExperienceDetail = {
            CompanyName: '',
            JobTitle: '',
            JobDescription: ''
        };
        $scope.DeleteId = '';

        $http.get(appGlobalSettings.apiBaseUrl + '/Profile?token=' + encodeURIComponent(userDetails.token) + "&email=" + encodeURIComponent(userDetails.Email))
            .then(function (data) {
                $scope.Profile = data.data;
            }, function (error) {
                console.log(error);
            });

        $scope.EditExperience = {
            Title: "Add Experience"
        };

        $scope.EditExperienceClick = function (id) {
            $http.get(appGlobalSettings.apiBaseUrl + '/WorkExperience/' + id + '?token=' + encodeURIComponent(userDetails.token))
                .then(function (data) {
                    $scope.ExperienceDetail = data.data;
                    tinymce.activeEditor.setContent(data.data.JobDescription);
                    setTimeout(function () {
                        var startDate = new Date($scope.ExperienceDetail.DateStart);
                        $("#PeriodFrom").val(startDate.getDate() + "-" + monthNamesShort[startDate.getMonth()] + '-' + startDate.getFullYear());
                        var endDate = new Date($scope.ExperienceDetail.DateEnd);
                        $("#PeriodTo").val(endDate.getDate() + "-" + monthNamesShort[endDate.getMonth()] + '-' + endDate.getFullYear());

                        $scope.requestAddWork.DateStart = startDate;
                        $scope.requestAddWork.DateEnd = endDate;
                    }, 1000);
                }, function (error) {
                    console.log(error);
                });
            $('#editExperience').modal('show');
        };

        $scope.AddExperience = function () {
            $scope.EditExperience = {
                Title: "Add Experience",
                Error: ''
            };
            $scope.ExperienceDetail = {};
            $('#editExperience').modal('show');
        };

        $scope.requestAddWork = {};
        $("#PeriodFrom").datetimepicker({
            timepicker: false,
            onChangeDateTime: function (dp, $input) {
                $scope.requestAddWork.DateStart = dp;
            },
            format: 'd-M-Y'
        });

        $("#PeriodTo").datetimepicker({
            timepicker: false,
            onChangeDateTime: function (dp, $input) {
                $scope.requestAddWork.DateEnd = dp;
            },
            format: 'd-M-Y'
        });

        $scope.DeleteClick = function (id) {
            $('#modalDeleteConfirmation').modal('show');
            $scope.DeleteId = id;
        };

        $scope.DeleteWorkExperience = function () {
            $http.delete(appGlobalSettings.apiBaseUrl + '/WorkExperience/' + $scope.DeleteId + '?token=' + encodeURIComponent(userDetails.token))
                .then(function (data) {
                    retrieveWorkExperience();
                    $('#modalDeleteConfirmation').modal('hide');
                }, function (error) {
                    console.log(error);
                });
        };

        $scope.AddWork = function () {
            $scope.requestAddWork.Username = userDetails.Email;
            $scope.requestAddWork.Id = $scope.ExperienceDetail.Id;
            $scope.requestAddWork.CompanyName = $scope.ExperienceDetail.CompanyName;
            $scope.requestAddWork.JobTitle = $scope.ExperienceDetail.JobTitle;
            $scope.requestAddWork.JobDescription = tinymce.activeEditor.getContent();

            if ($scope.ExperienceDetail.Id == null || $scope.ExperienceDetail.Id == undefined) {
                $http.put(appGlobalSettings.apiBaseUrl + '/WorkExperience?token=' + encodeURIComponent(userDetails.token),
                    JSON.stringify($scope.requestAddWork),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    ).then(function (data) {
                        $("#pnlAddWorkError").hide();
                        $("#pnlAddWorkSuccess").slideDown();
                        $scope.ExperienceDetail.Id = data.data.Id;
                        retrieveWorkExperience();
                    }, function (error) {
                        $scope.EditExperience.Error = error.data;
                        $("#pnlAddWorkError").slideDown();
                    });
            }
            else {
                $http.post(appGlobalSettings.apiBaseUrl + '/WorkExperience?token=' + encodeURIComponent(userDetails.token) + '&id=' + encodeURIComponent($scope.requestAddWork.Id),
                    JSON.stringify($scope.requestAddWork),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    ).then(function (data) {
                        $("#pnlAddWorkError").hide();
                        $("#pnlAddWorkSuccess").slideDown();
                        $scope.ExperienceDetail.Id = data.data.Id;
                        retrieveWorkExperience();
                    }, function (error) {
                        $scope.EditExperience.Error = error.data;
                        $("#pnlAddWorkError").slideDown();
                    });
            }
        }

        $scope.WorkExperienceList = [];
        var retrieveWorkExperience = function () {
            $http.get(appGlobalSettings.apiBaseUrl + '/WorkExperience?token=' + encodeURIComponent(userDetails.token) + "&email=" + encodeURIComponent(userDetails.Email))
                .then(function (data) {
                    $.each(data.data, function (index, item) {
                        var dateStart = new Date(item.DateStart);
                        item.DateStart = monthNames[dateStart.getMonth()] + ' ' + dateStart.getFullYear();
                        var dateEnd = new Date(item.DateEnd);
                        item.DateEnd = monthNames[dateEnd.getMonth()] + ' ' + dateEnd.getFullYear();
                        item.JobDescription = $sce.trustAsHtml(item.JobDescription);
                    });
                    $scope.WorkExperienceList = data.data;
                }, function (error) {
                    console.log(error);
                });
        };
        retrieveWorkExperience();


        var locationElement = (document.getElementById("joblocation"));
        var autocomplete = new google.maps.places.Autocomplete(locationElement, 
            { types: ['geocode'] });
        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            var searchLat = place.geometry.location.lat();
            var searchLng = place.geometry.location.lng();
        });


    }
    else {
        document.location.href = "/";
    }
}]);