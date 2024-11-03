import { Footer } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsWhatsapp,
  BsDribbble,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const FooterComp = () => {
  return (
    <Footer container className="border-t-2 border-gray-300">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via bg-purple-500 to-pink-600 rounded-lg text-white">
                AfroCode
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 mt-5">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://maith.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Maith corporation
                </Footer.Link>
                <Footer.Link
                  href="https://maith.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AfroCode
                </Footer.Link>
                <Footer.Link
                  href="https://maith.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lequette
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://maith.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://maith.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkdin
                </Footer.Link>
                <Footer.Link
                  href="https://maith.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Malte
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://maith.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Police
                </Footer.Link>
                <Footer.Link
                  href="https://maith.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CGU
                </Footer.Link>
                <Footer.Link
                  href="https://maith.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="AfroCode Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex items-center gap-6 sm:mt-0 mt-4">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsWhatsapp} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComp;
