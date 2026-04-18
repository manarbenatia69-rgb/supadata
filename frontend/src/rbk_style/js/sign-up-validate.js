/* FORM WIZARD VALIDATION SIGN UP ======================================== */

jQuery(function ($) {
    "use strict";

    // Chose here which method to send the email, available:
    // Phpmaimer text/html > phpmailer/registration_phpmailer.php
    // Phpmaimer text/html SMPT > phpmailer/registration_phpmailer_smtp.php
    // PHPmailer with html template > phpmailer/registration_phpmailer_template.php
    // PHPmailer with html template SMTP> phpmailer/registration_phpmailer_template_smtp.php



    $('#custom').stepy({
        backLabel: 'Previous',
        block: true,
        errorImage: false,
        nextLabel: 'Next',
        titleClick: true,
        description: true,
        legend: false,
        validate: true
    });


    $('#custom').validate({

        errorPlacement: function(error, element) {

            $('#custom .stepy-error').append(error);
        },
        rules: {
            'profilepicture':'required',
            'companylogo':'required',
            'coverphoto':'required',
            'firstname': 'required',
            'jobtitle': 'required',

            'company_name':'required',
            'email': 'required',
            'telephone': 'required',
            'company_url':'required',



            'city': 'required',
            'zip_code': 'required',
            'country': 'required',
            'terms': 'required' // BE CAREFUL: last has no comma
        },
        messages: {
            'profilepicture': { required: 'Profile picture required' },
            'companylogo': { required: 'Company logo required' },
            'coverphoto': { required: 'Cover photo required' },
            'firstname': { required: 'Name required' },
            'jobtitle': { required: 'Job title required' },

            'company_name': { required: 'Company name required' },
            'email': { required: 'Invalid e-mail!' },
            'telephone': { required: 'Telephone required' },
            'company_url': { required: 'Company url required' },



        },
        submitHandler: function(form){
            if ($('input#website').val().length == 0) {
                form.submit();
            }
        }
    });

});
