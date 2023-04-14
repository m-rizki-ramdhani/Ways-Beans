import { Button, Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";
import Swal from "sweetalert2";
import DeleteData from "../component/ModalProduct";

export default function ListProduct() {
  const navigate = useNavigate();

  // Variabel for delete product data
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  // Modal Confirm delete data
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // For get id product & show modal confirm delete data
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };
  //hook fetching data for product
  let { data: products, refetch } = useQuery("productsAdminCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });
  // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      const response = await API.delete(`/product/${id}`);
      console.log(response);
      refetch();
      navigate("/listproduct");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delete Success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Delete Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  });

  const handleUpdate = (id) => {
    navigate(`/update-product/${id}`);
  };

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  let asceding = [];
  if (products !== undefined) {
    asceding = [...products];
    asceding.sort((a, b) => b.id - a.id);
  }
  return (
    <>
      <Container className="mt-5 mb-5">
        <h2>List Product</h2>
        <Table
          striped
          bordered
          hover
          size="sm"
          className="table table-bordered table-active mt-4 text-center text-align-center"
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {asceding?.map((item, index) => {
              return (
                <tr key={item.id} className="text-center text-align-center">
                  <td className="pt-4 pb-4 ps-2 pe-2">{index + 1}</td>
                  <td className="pt-4 pb-4 ps-5 pe-5">
                    <img
                      src={item.photo}
                      alt={item.name}
                      style={{ width: "80px" }}
                    ></img>
                  </td>
                  <td className="pt-4 pb-4 ps-5 pe-5">{item.name}</td>
                  <td className="pt-4 pb-4 ps-5 pe-5">{item.stock}</td>
                  <td className="pt-4 pb-4 ps-5 pe-5">Rp.{item.price}</td>
                  <td
                    className="pt-4 pb-4 ps-5 pe-5"
                    style={{ textAlign: "justify" }}
                  >
                    {item.description}
                  </td>
                  <td className="pt-4 pb-4 ps-5 pe-5">
                    <Button
                      onClick={() => handleDelete(item.id)}
                      type="submit"
                      className="btn-danger"
                      size="sm"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleUpdate(item.id)}
                      className="btn-success mt-3"
                      type="submit"
                      size="sm"
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
}
