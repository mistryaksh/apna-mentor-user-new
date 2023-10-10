import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../";
import { useSelector } from "react-redux";

export interface InitialStateProps {
     navBar: boolean;
     faqs: {
          label: string;
          desc: string;
     }[];
     activeFaq: number | null;
}

const initialState: InitialStateProps = {
     navBar: false,
     activeFaq: null,
     faqs: [
          {
               desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error iste adipisci recusandae, sequi qui itaque unde eum aliquam et maxime.",
               label: "What is apna mentor?",
          },
          {
               desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error iste adipisci recusandae, sequi qui itaque unde eum aliquam et maxime.",
               label: "Where can i find apna mentor office?",
          },
          {
               desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error iste adipisci recusandae, sequi qui itaque unde eum aliquam et maxime.",
               label: "How apna mentor handle consultation?",
          },
          {
               desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error iste adipisci recusandae, sequi qui itaque unde eum aliquam et maxime.",
               label: "How can we get best mentors?",
          },
          {
               desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error iste adipisci recusandae, sequi qui itaque unde eum aliquam et maxime.",
               label: "Is apna mentor mentors clinic?",
          },
          {
               desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error iste adipisci recusandae, sequi qui itaque unde eum aliquam et maxime.",
               label: "How does consultation works?",
          },
          {
               desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error iste adipisci recusandae, sequi qui itaque unde eum aliquam et maxime.",
               label: "How to chat / video chat with mentor online?",
          },
          {
               desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error iste adipisci recusandae, sequi qui itaque unde eum aliquam et maxime.",
               label: "What condition that we need therapy?",
          },
     ],
};

const LayoutSlice = createSlice({
     initialState,
     name: "layout",
     reducers: {
          handleNavbar: (state) => {
               state.navBar = !state.navBar;
          },
          handleActiveFaq: (state, action) => {
               if (state.activeFaq === action.payload) {
                    state.activeFaq = null;
               } else state.activeFaq = action.payload;
          },
     },
});

export const useLayoutSlice = () =>
     useSelector((state: RootState) => {
          return state.layout;
     });

export const LayoutReducer = LayoutSlice.reducer;
export const { handleNavbar, handleActiveFaq } = LayoutSlice.actions;
