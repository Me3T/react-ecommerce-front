import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryForm from "../../components/forms/CategoryForm";
import LocalSearch from "../../components/forms/LocalSearch";
import AdminNav from "../../components/routes/Nav/AdminNav";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../functions/category";

function CategoryCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  // Step 1 for searching and filtering

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}"is created`);
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  /* Above function is used to create categories*/

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    }
  };
  {
    /* Step 3 for search and filtering*/
  }

  {
    /* Step 4 for search and filtering */
  }

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
              <h4>Create Category</h4>
            )}
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
            {/* Props passed*/}

            {/*  Step 2 and 3 moved to localsearch */}

            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {/*  Step 5 for search and filtering */}
            {categories.filter(searched(keyword)).map((c) => (
              <div className="alert alert-secondary" key={c._id}>
                {c.name} {""}
                <span
                  onClick={() => handleRemove(c.slug)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                {""}
                <Link to={`/admin/category/${c.slug}`}>
                  <span className="btn btn-sm float-right">
                    <EditOutlined className="text-warning" />
                  </span>
                </Link>
              </div>
            ))}
            {/*the above code will map through categories and show them*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCreate;
