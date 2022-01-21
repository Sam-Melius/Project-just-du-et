export function renderProfile(profile) {


    const profileEl = document.createElement('div');
    const talentsDiv = document.createElement('div');
    const nameEl = document.createElement('p');
    const haveEl = document.createElement('p');
    const wantEl = document.createElement('p');

    profileEl.classList.add('profile');
    talentsDiv.classList.add('talents');
    nameEl.classList.add('profiles-name');

    profileEl.href = `../details-page/?id=${profile.id}`;

    nameEl.textContent = profile.name;
    haveEl.textContent = `Have: ${profile.have_talents}`;
    wantEl.textContent = `Need: ${profile.want_talents}`;
    
    talentsDiv.append(haveEl, wantEl);
        
    profileEl.append(nameEl, talentsDiv);

    return profileEl;
}
export function renderProfileDetails(profile) {
    const profileEl = document.createElement('div');
    const talentsDiv = document.createElement('div');
    const aboutDiv = document.createElement('div');
    const nameEl = document.createElement('p');
    const locationEl = document.createElement('p');
    const interestsEl = document.createElement('p');
    const aboutEl = document.createElement('p');
    const haveEl = document.createElement('p');
    const wantEl = document.createElement('p');
    
    nameEl.classList.add('profiles-name');
    profileEl.classList.add('profile');
    talentsDiv.classList.add('talents');
    aboutDiv.classList.add('about');
    locationEl.classList.add('location');

    nameEl.textContent = profile.name;
    locationEl.textContent = `${profile.location}`;
    interestsEl.textContent = `interests: ${profile.interests}`;
    aboutEl.textContent = `about me: ${profile.about}`;
    haveEl.textContent = `have talent: ${profile.have_talents}`;
    wantEl.textContent = `need talent: ${profile.want_talents}`;
    
    talentsDiv.append(haveEl, wantEl);
    
    aboutDiv.append(interestsEl, aboutEl);
    
    profileEl.append(nameEl, locationEl, talentsDiv, aboutDiv,);

    return profileEl;
}