// forme d'une url
// https://findthemonument.netlify.app/#found-192892
// regex d'un id /^\d{6}$/m

const FOUND_HASH_START_WITH = "#found-";

window.addEventListener('DOMContentLoaded', addMonumentToFoundListOrFail)


function addMonumentToFoundListOrFail() {
    const pageHash = (new URL(window.location.href).hash);

    // on coninue que si le hash correspond à un hash de monument trouvé
    if(!pageHash.startsWith(FOUND_HASH_START_WITH)) return;
      

    const monumentId = pageHash.replace(FOUND_HASH_START_WITH,'');
    console.log(monumentId);

    if (monumentExistWithId(monumentId)) {
        addMonumentToFoundList(monumentId);
        
        // popup de félicitation
    } else {
        console.log('pas ok');
        // popup d'erreur
    }
}

function monumentExistWithId(monumentId) {
    return MONUMENTS.findIndex(monument=>monument.id == monumentId) >= 0;
}

function addMonumentToFoundList(monumentId) {
    const monumentsFoundString = Cookies.get("monuments_found");
    let monumentsFoundList;

    try {
        monumentsFoundList = JSON.parse(monumentsFoundString);
    } catch(e) {
        monumentsFoundList = [];
    }
    console.log('ok');

    console.log(monumentsFoundList);
    if(!monumentsFoundList.includes(monumentId)) {
        monumentsFoundList.push(monumentId)
    }

    console.log(monumentsFoundList);
    Cookies.set("monuments_found", JSON.stringify(monumentsFoundList), { sameSite: 'strict', expires: 60 })
}

