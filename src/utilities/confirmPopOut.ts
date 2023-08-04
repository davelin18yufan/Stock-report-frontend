import Swal from "sweetalert2"

export function confirmPopOut(
  msg: string,
  showCancel: boolean
): Promise<boolean> {
  if (!showCancel) {
    return Swal.fire({
      title: msg,
      confirmButtonText: "GOT IT!",
      confirmButtonColor: "green",
    }).then((result) => result.isConfirmed)
  }
  return Swal.fire({
    title: msg,
    showDenyButton: true,
    confirmButtonText: "Yes",
    denyButtonText: "No",
    confirmButtonColor: "green",
    denyButtonColor: "gray",
  }).then((result) => result.isConfirmed)
}
