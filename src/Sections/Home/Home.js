import React from 'react';
import Navbar from './../../Components/Layout/Navbar';
import { Header } from './Blocks/Header';
import { TheProblem } from './Blocks/TheProblem';
import { Idea } from './Blocks/Idea';
import { Technology } from './Blocks/Technology';
import { Product } from './Blocks/Product';
import { Footer } from './Blocks/Footer';

export default function Home(props) {
  return (
    <>
      <Navbar />
      <Header />
      <TheProblem />
      <Idea />
      <Technology />
      <Product />
      <Footer />
    </>
  );
}