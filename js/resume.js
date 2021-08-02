function setDimmer(mode){
    if(mode){
        $('.fullpage').hide();
        $('.page.dimmer').dimmer('show');
    }
    else{
        $('.page.dimmer').dimmer('hide');
        $('.fullpage').show();
    }
}

function addSection(title, colno, contentgen, data, genargs) {
    var section_html = `
        <div class="section">
            <h3>` + title + `</h3>
            <div class="ui list">`

    section_html += contentgen(data, genargs);

    section_html += `
            </div>
        </div>`

    $('#res_col' + colno).append(section_html);
}

function contactsSecGen(contacts) {
    var contacts_html = "";
    for(let c of contacts){
        contacts_html += `
            <div class="item bit-spaced f5">
                <i class='` + c.icon + ` icon'></i>
                <div class="content">
                    <a href='` + c.url +`'>` + c.text + `</a>
                </div>
            </div>`;
    }
    return contacts_html;
}

function skillsGen(skills, skilltype) {
    var skill_html = ""
    for(let s of skills[skilltype].value){
        skill_html += `
            <div class="item bit-spaced">
                <i class="angle right icon"></i>
                <div class="content f5"> ` + s + `</div>
            </div>`;
    }
    return skill_html;
}

function responsibilitiesGen(responsibilities) {
    var resp_html = ""
    for(let r of responsibilities){
        resp_html += `
            <div class="item more-spaced">
                <div class="content">
                    <div class="fbold mt4">` + r.of + `</div>
                    <div class="f-5 mt4">` + r.role + `</div>
                    <div class="f-5 fthin mt4">` + r.duration + `</div>
                </div>
            </div>`
    }
    return resp_html;
}

function experiencesGen(experiences) {
    var experiences_html = ""
    for(let e of experiences){
        experiences_html += `
            <div class="item spaced">
                <div class="content">
                    <div class="float-container">
                        <div class="f5 fbold float-left">` + e.role + `</div>
                        <div class="fthin float-right">` + e.duration + `</div>
                    </div>
                    <div class="mb7">` + e.firm + `</div>
                    <div class="f-5 mb10">` + e.work + `</div>
                </div>
            </div>`
    }
    return experiences_html;
}

function educationGen(education) {
    var education_html = ""
    for(let e of education){
        education_html += `
            <div class="item">
                <div class="content">
                    <div class="float-container mt2">
                        <div class="fbold float-left">` + e.school + `</div>
                        <div class="fthin float-right">` + e.duration + `</div>
                    </div>
                    <div class="float-container mt-2">
                        <div class="float-left">` + e.degree + `</div>
                        <div class="float-right">` + e.gradetype + ` : ` + e.gradevalue + `</div>
                    </div>
                </div>
            </div>`
    }
    return education_html;
}

function projectsGen(projects) {
    var projects_html = ""
    for(let p of projects){
        first_line = p.name + (("descr" in p)?" – "+p.descr:"");
        second_line = p.for + " – " + p.year;
        third_line = `<a href="https://` + p.link + `">` +  p.link + `</a>`;
        projects_html += `
            <div class="item bit-spaced">
                <div class="content">
                    <div class="fbold">` + first_line + `</div>
                    <div class="f-10 mt4">` + second_line +`</div>
                    <div class="f-10 fthin mt2">` + third_line + `</div>
                </div>
            </div>`
    }
    return projects_html;
}

function achievementsGen(achievements) {
    var achiev_html = ""
    for(let a of achievements){
        achiev_html += `
            <div class="item spaced">
                <i class='angle right icon'></i>
                <div class="content">` + a + `</div>
            </div>`;
    }
    return achiev_html;
}

function addColumns(data) {
    addSection("Contacts", 1, contactsSecGen, data.contacts);
    addSection("Technical Skills", 1, skillsGen, data.skills, 0);
    addSection("Soft Skills", 1, skillsGen, data.skills, 1);
    addSection("Responsibilities taken", 1, responsibilitiesGen, data.responsibilities);

    addSection("Experiences", 2, experiencesGen, data.experiences);
    addSection("Education", 2, educationGen, data.education);
    addSection("Projects", 2, projectsGen, data.projects);
    addSection("Achievements", 2, achievementsGen, data.achievements);
}

function addDownloadWIPModal() {
    var modal_html = `
        <div class="ui mini modal downloadwip">
            <div class="header">Download</div>
            <div class="content">
                <div>Download resume is temporarily not available due to updated CORS Policy</div>
                <div>For now click Print>'Save as PDF'</div>
            </div>
            <div class="actions">
                <div class="ui approve button">OK</div>
            </div>
        </div>
    `
    $('#modals-conatiner').append(modal_html);
}

function addModals() {
    addDownloadWIPModal();
}

function setupMenu() {
    $("#print_btn").click(function(){
        window.print();
    });
    $("#download_btn").click(function(){
        $('.mini.modal.downloadwip').modal('show');
    });
    $("#protfolio_btn").click(function(){
        window.open('https://karan0805.github.io/portfolio');
    });
}

function prepareData() {
    $.getJSON("https://gist.githubusercontent.com/karan0805/ef92455e063029094356d2bb676f2cdc/raw/3fe7f61ef1d5f2b5bcb3f93af443443238bf2d91/resumedata.json")
        .done(function(json) {
            preparePage(json);
        })
        .fail(function() {
            $.getJSON('local_resume_data.json', function(json) {
                preparePage(json);
            });
        });
}

function preparePage(data) {
    addColumns(data);
    addModals();
    setupMenu();
    setDimmer(false);
}

$(document).ready(function() {
    setDimmer(true);
    prepareData();
});
