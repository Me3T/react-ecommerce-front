import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CategoryForm from "../../components/forms/CategoryForm";
import AdminNav from "../../components/routes/Nav/AdminNav";
import { getCategory, updateCategory } from "../../functions/category";

function CategoryUpdate({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}"is updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  /* Above function is used to create categories*/

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col">
            {loading ? (
              <h4 className="red-danger">Loading...</h4>
            ) : (
              <h4>Update Category</h4>
            )}
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryUpdate;
