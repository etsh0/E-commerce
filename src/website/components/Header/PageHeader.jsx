// import { useLocation, Link } from 'react-router-dom';
// import Arrow from '../../../assets/Chevron Right.svg'

// export const PageHeader = () => {

//   const location = useLocation();
//   const pathnames = location.pathname.split('/').filter((x) => x);


//   if (location.pathname === '/') return null;

// //   const pageTitle = pathnames[pathnames.length - 1]?.replace(/-/g, ' ') || "";

//   return (
//     <div className="bg-secondary border-b border-gray-100">
//       <div className="container mx-auto px-4 py-4 sm:px-10">
//         {/* <h1 className="text-3xl font-bold capitalize mb-2 text-[#111827]">
//           {pageTitle}
//         </h1> */}

//         <nav className="flex items-center text-sm text-gray-500 capitalize">
//             <Link to="/" className="hover:text-black transition-colors">
//               Ecommerce
//             </Link>
            
//             {pathnames.map((value, index) => {
//               const last = index === pathnames.length - 1;
//               const to = `/${pathnames.slice(0, index + 1).join('/')}`;

//               return (
//                 <span key={to} className="flex items-center">

//                   <span className="mx-2 text-gray-400">
//                     <img src={Arrow} alt=">" className="" />
//                   </span>
                  
//                   {last ? (
//                     <span className="text-[#111827] font-medium">
//                       {value.replace(/-/g, ' ')}
//                     </span>
//                   ) : (
//                     <Link to={to} className="hover:text-black transition-colors">
//                       {value.replace(/-/g, ' ')}
//                     </Link>
//                   )}
//                 </span>
//               );
//             })}
//         </nav>
//       </div>
//     </div>
//   );
// }
