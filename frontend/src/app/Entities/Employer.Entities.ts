export class Employer {
    constructor(
           public id?:             number,
           public profilepicture?: string,
           public companylogo?:    string,
           public coverphoto?:     string,
           public nom?:            string,
           public prenom?:         string,
           public jobtitle?:       string,
           public departement?:    string,
           public companyname?:    string,
           public email?:          string,
           public pwd?:            string,
           public telephone?:      number,
           public urlcompany?:     string,
           public adresse?:        string,
           public color?:          string,
           public police?:         string,
           public fblink?:         string,
           public linkedinlink?:   string,
           public githublink?:     string,
    ) {}
}