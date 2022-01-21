const SUPABASE_URL = 'https://bldkvwcsogzeeohrgemf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MjExOTQxMiwiZXhwIjoxOTU3Njk1NDEyfQ.ZB2Np0Wtsn23P3JjRuzH5v11_nI4pm9CfkE63toNYLc';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}

export async function getUserId(userId) {
    const response = await client
        .from('profiles')
        .select('id')
        .match({ user_id: userId })
        .single();
    return checkError(response);

}
export async function getAuthor(userId) {
    const response = await client
        .from('profiles')
        .select()
        .match({ user_id: userId })
        .single();
    return checkError(response);

}

export async function searchFunction(searchInput) {
    console.log(searchInput, 'searchInput');
    const response = await client
        .from('profiles')
        .select()
        //.match({ want_talents: searchInput })
        .or(`name.ilike.*${searchInput}*,want_talents.ilike.*${searchInput}*,have_talents.ilike.*${searchInput}*`);
            //{ want_talents: searchInput }, 
            //{ have_talents: searchInput });
    return checkError(response);
}



export async function createMessage(message, id) {
    const response = await client   
        .from('messages')
        .insert([{
            message,
            // user_id: senderId,
            recipient_id: id
        }]);

    return checkError(response);
}

export async function createProfile(email, name, want, have) {
    const response = await client   
        .from('profiles')
        .insert([{
            email,
            name,
            want_talents: want,
            have_talents: have,
        }]);

    return checkError(response);
}

export async function updateProfile(profile) {
    console.log(profile);
    const response = await client
    
        .from('profiles')
        
        .update([{ 
            name: profile.name,
            interests: profile.interests,
            about: profile.about,
            location: profile.location,
            want_talents: profile.want_talents,
            have_talents: profile.have_talents,
        }])
        .match({ id: profile.user_id })
        .single();

    return checkError(response);
}

export async function fetchProfile(id) {
    const response = await client
        .from('profiles')
        .select('*, messages (*)')
        .match({ id })
        .single();

    return checkError(response);
}

export async function fetchMessages(id) {
    const response = await client
        .from('messages')
        .select()
        .match({ recipient_id: id });

    return checkError(response);
}

export async function fetchProfiles() {
    const response = await client
        .from('profiles')
        .select();
    
    return checkError(response);
}
    
// 


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./main-page');
    }
}

export async function signupUser(email, password, name, want, have){
    const response = await client.auth.signUp({ email, password });
    
    await createProfile(email, name, want, have);
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
