import Swal from "sweetalert2"

export function confirmPopOut(msg: string, showCancel: boolean):Promise<boolean> {
  return Swal.fire({
    title: msg,
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: "No",
    confirmButtonColor: "green",
    denyButtonColor: `${showCancel && "gray"}`,
  }).then((result) => result.isConfirmed)
}