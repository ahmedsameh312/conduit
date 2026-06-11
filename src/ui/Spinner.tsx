// export default function Spinner({
//   size = "w-8 h-8",
//   color = "border-blue-500",
// }) {
//   return (
//     <div className="flex justify-center items-center">
//       <div
//         className={`${size} border-4 ${color} border-t-transparent rounded-full animate-spin`}
//         role="status"
//       >
//         <span className="sr-only">Loading...</span>
//       </div>
//     </div>
//   );
// }
export default function Spinner({
  size = "w-8 h-8",
  color = "border-green-500",
}) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${size} border-4 ${color} border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
}
