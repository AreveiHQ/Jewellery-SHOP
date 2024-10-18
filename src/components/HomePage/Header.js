"use client";
import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Card,
  IconButton,
  Badge
} from "@/MaterialTailwindNext";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
 import Store from '@/assets/Stores.svg'
 import Cart from '@/assets/Cart.svg'
import Link from "next/link";
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import Search from './Search.js';
import ProfileMenu from './ProfileMenu.js';
import NavList from './Navlist.js';
import Cookies from 'js-cookie';
import { getServerCookie } from '@/utils/serverCookie.js';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setIsNavOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    const token = getServerCookie('token');
    setIsLoggedIn(!!token);
  }, []);

 
  return (
   
    
    <Navbar className="mx-auto p-2 lg:pl-6 shadow-none sticky top-0 z-50">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography as="a" href="#" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
          <Image width={80} height={80} src="/images/jenii1.png" alt="" />
        </Typography>
        <Search />
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <div className="flex gap-3 text-pink-500">
          <IconButton color="white" className="shadow-none">
            <Store />
          </IconButton>
          <Link href="/checkout">
            <Badge content="5" color="pink">
              <IconButton color="white" className="shadow-none">
                <Cart />
              </IconButton>
            </Badge>
          </Link>

          {/* Conditionally render ProfileMenu or Login button */}
          {isLoggedIn ? (
            <ProfileMenu />
          ) : (
              <Link href='/login'>
            <Button
              className="whitespace-nowrap text-pink-600"
              size="sm"
              variant="text"
              
            >
              <span>Log In</span>
                </Button>
              </Link>
          )}
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
        <Search />
      </Collapse>
    </Navbar>
  );
}