import React, { useState, useEffect, useRef } from "react";
import { gitHubApi } from "../config/config";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Track if more projects are available
  const perPage = 15; // Number of projects per page
  const projectRefs = useRef([]);
  const [visibleProjects, setVisibleProjects] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${gitHubApi}?per_page=${perPage}&page=${page}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();

        // Stop fetching if no more projects
        if (data.length < perPage) {
          setHasMore(false);
        }

        const newProjects = data.map((project) => ({
          name: project.name,
          link: project.html_url,
          description: project.description || "No description available",
        }));

        setProjects((prevProjects) => {
          const updatedProjects = [...prevProjects, ...newProjects];
          return updatedProjects.filter(
            (v, i, a) => a.findIndex((t) => t.name === v.name) === i
          );
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page]);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      const updates = {};
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.index;
          updates[index] = true;
        }
      });
      setVisibleProjects((prev) => ({ ...prev, ...updates }));
    }, observerOptions);

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [projects]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <section id="projects" className="text-white p-8 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold neon-glow mb-8 text-center">
        Projects
      </h2>
      {loading && !projects.length && (
        <div style={{ color: "white", textAlign: "center" }}>
          Loading projects...
        </div>
      )}
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => (projectRefs.current[index] = el)}
            data-index={index}
            style={{
              opacity: visibleProjects[index] ? 1 : 0,
              transform: visibleProjects[index]
                ? "translateY(0)"
                : "translateY(100px)",
              transition: `opacity 0.8s ease-out ${
                index * 0.1
              }s, transform 0.8s ease-out ${index * 0.1}s`,
            }}
            className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-2 text-center">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-neon transition-colors duration-300"
              >
                {project.name}
              </a>
            </h3>
            <p className="text-gray-300">{project.description}</p>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg font-semibold rounded-full shadow-lg hover:from-purple-500 hover:to-blue-500 transition duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;
