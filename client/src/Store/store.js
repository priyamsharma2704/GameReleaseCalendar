import {create}  from 'zustand';

export const useMonthStore = create((set)=>({
    month:null,
    year:null,
    setMonth: (mon) => set((state)=>({month: mon})),
    setYear: (yr) => set((state) => ({year: yr})),
    incrementMonth: () => set((state)=>{
        console.log("store inc");
        let newMonth = state.month + 1;
        let newYear = state.year;
        if(newMonth > 11)
        {
            newMonth = 0;
            newYear++;
        }
        return {month: newMonth, year : newYear}
    }),
    decrementMonth: () => set((state)=>{
        console.log("store dec");
        let newMonth = state.month - 1;
        let newYear = state.year;

        if(newMonth < 0)
        {
            newMonth = 11;
            newYear--;
        }
        return {month:newMonth, year:newYear}
    })
}));

export const useDayStore = create((set) =>({
    days: [],
    setDays: ()=>set((state) =>{
        const {month, year} = useMonthStore.getState();
        let newDays = new Date(year, month + 1, 0).getDate();
        const daysArr = [...Array(newDays).keys()].map(day => day + 1);
        return { days: daysArr};
    })
}));

export const useGameDetails = create((set) =>({
    gamesDetails:[],
    setGamesDetails: (details)=>set((state)=>{
        return { gamesDetails : details};
    })
}))