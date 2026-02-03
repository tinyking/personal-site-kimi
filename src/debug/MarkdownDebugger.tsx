import React from 'react';
import { getAllBlogPosts } from '../lib/markdown';

const MarkdownDebugger: React.FC = () => {
  const blogPosts = getAllBlogPosts();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Markdown Debugger</h1>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Found {blogPosts.length} blog posts:</h2>
        {blogPosts.map((post, index) => (
          <div key={post.id || index} className="border p-4 rounded">
            <h3 className="font-bold text-lg mb-2">Post #{index + 1}: {post.title}</h3>
            <ul className="space-y-1 text-sm">
              <li><strong>ID:</strong> {post.id}</li>
              <li><strong>Slug:</strong> {post.slug}</li>
              <li><strong>Category:</strong> {post.category}</li>
              <li><strong>Date:</strong> {post.date}</li>
              <li><strong>Read Time:</strong> {post.readTime}</li>
              <li><strong>Tags:</strong> {Array.isArray(post.tags) ? post.tags.join(', ') : 'N/A'}</li>
              <li><strong>Excerpt Length:</strong> {post.excerpt.length} characters</li>
              <li><strong>Content Length:</strong> {post.content.length} characters</li>
            </ul>
            <details className="mt-2">
              <summary className="cursor-pointer text-blue-500">Show content preview</summary>
              <pre className="mt-2 p-2 bg-gray-100 text-xs overflow-x-auto">
                {post.content.substring(0, 300)}...
              </pre>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarkdownDebugger;