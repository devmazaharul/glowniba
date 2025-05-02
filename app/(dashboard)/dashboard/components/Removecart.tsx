import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MdOutlineDelete } from "react-icons/md";
import { useCartStore } from "@/store/addTocart";


const Removecart = ({productId}:{productId:string}) => {

  const removeFromCart=useCartStore((state)=>state.removeFromCart)


  return (
    <div>
                    <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline" className="cursor-pointer border-0 shadow-none">
      <MdOutlineDelete className="text-xl fill-red-400 hover:fill-red-500" />
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This product will be permanently removed from your cart.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
      <AlertDialogAction
        className="bg-gray-700 hover:bg-gray-600 "
        onClick={() => {
          removeFromCart(productId);
          toast.success("Item removed from cart.");
        }}
      >
        Yes, Remove
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </div>
  );
}

export default Removecart;
