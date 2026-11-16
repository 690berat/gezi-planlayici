// Genel gezi notu kuralları; TripNote formu üzerinden localStorage kaydına bağlanır.
export const MAX_TRIP_NOTE_LENGTH=2000;
export function updateTripNote(trip,note){
 if(typeof note!=='string')throw new Error('Not metin olmalıdır.');
 if(note.length>MAX_TRIP_NOTE_LENGTH)throw new Error('Not en fazla 2000 karakter olabilir.');
 return {...trip,generalNote:note.trim()};
}
