module.exports = {
    
    same: (current,compare)=>{
        return current == compare
    }
    ,
    format_date:(date)=>{
        return date.toLocaleDateString()
    },
    format_time:(date)=>{
        return date.toLocaleDateString() +' at ' + date.toLocaleTimeString()
    },
    // first_theme:(types)=>{
    //     const typeColor = {
    //         bug: "#26de81",
    //         dragon: "#ffeaa7",
    //         electric: "#fed330",
    //         fairy: "#FF0069",
    //         fighting: "#30336b",
    //         fire: "#f0932b",
    //         flying: "#81ecec",
    //         grass: "#00b894",
    //         ground: "#EFB549",
    //         ghost: "#a55eea",
    //         ice: "#74b9ff",
    //         normal: "#95afc0",
    //         poison: "#6c5ce7",
    //         psychic: "#a29bfe",
    //         rock: "#2d3436",
    //         water: "#0190FF",
    //         steel: "#7a7f80",
    //         dark: "#383838"
    //       };
          
    //     const type = JSON.parse(types)[0]

    //     return typeColor[type];
    // },
    parse: (json)=>{
        return JSON.parse(json)
    },
    one_theme:(type)=>{
        const typeColor = {
            bug: "#26de81",
            dragon: "#ffeaa7",
            electric: "#fed330",
            fairy: "#FF0069",
            fighting: "#30336b",
            fire: "#f0932b",
            flying: "#81ecec",
            grass: "#00b894",
            ground: "#EFB549",
            ghost: "#a55eea",
            ice: "#74b9ff",
            normal: "#95afc0",
            poison: "#6c5ce7",
            psychic: "#a29bfe",
            rock: "#2d3436",
            water: "#0190FF",
            steel: "#7a7f80",
            dark:'#383838'
          };
          
       

        return typeColor[type];
    },
    cap:(str)=>{
        return str[0].toUpperCase()+str.slice(1);
    },
    notAFan: (followers, currentUserID)=>{
        return followers.map(follower=>follower.id).includes(currentUserID)
    }
   
}