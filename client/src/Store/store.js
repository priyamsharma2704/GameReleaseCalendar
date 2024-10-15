import {create}  from 'zustand';

export const monthStore = create((set)=>({
    month:null,
    year:null,
    setMonth: (mon) => set((state)=>({month: mon})),
    setYear: (yr) => ((state) => ({year: yr})),
    incrementMonth: () => set((state)=>{
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
        let newMonth = state.month;
        let newYear = state.year;

        if(newMonth < 0)
        {
            newMonth = 11;
            newYear--;
        }
        return {month:newMonth, year:newYear}
    })
}));