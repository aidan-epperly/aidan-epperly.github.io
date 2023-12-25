---
title: "Equations to Algorithms --- Stable Algebraic Fixed Points"
excerpt_separator: "<!--more-->"
categories:
  - Blog
permalink: "eqtoalg"
tags: Linear-Algebra, Algorithms, Polar-Decomposition
mathjax: true
---

I tend to spend a lot of time on math Wikipedia. In the hierarchy of math writing, I would put Wikipedia just above graduate level texts in mathematics and right below math papers in terms of readability. However, if you look around enough, there are some real gems.

One such gem that I found the other day is a formula for computing the polar decomposition of a matrix. The polar decomposition of a matrix is a broad generalization of the polar decomposition of a complex number. With complex numbers, we have the decomposition $$z = re^{i\theta}$$ where $$r$$ is a nonnegative real number and $$e^{i\theta}$$ is some point on the unit circle. We aim to do a similar thing to a square matrix $$A.$$

With matrices, there is a natural notion of nonnegativity: positive semidefinite matrices. These are symmetric matrices whose eigenvalues are all nonnegative. There is also a generalization of being "on the unit circle" for matrices, which is the notion of being an orthogonal matrix. An orthogonal matrix is any square matrix whose columns are orthonormal. So, the polar decomposition of a matrix should factor a matrix $$A$$ into a product of a positive semidefinite matrix and an orthogonal one, and this is exactly what it does!

The polar decomposition of a matrix $$A$$ is given by two matrices $$U$$ and $$R$$ such that $$A = UR$$, $$U$$ is orthogonal, and $$R$$ is positive semidefinite. One method of computing such a decomposition would be to find some way of computing $$U$$ and then multiplying $$A$$ by $$U^T$$ to yield $$U^T A = R.$$ An algorithm for computing $$U$$ if $$A$$ is invertible is given by the following iteration. Start with $$U_0 = A$$ and let

$$
U_{i+1} = \frac{1}{2}(U_i + U_i^{-T}).
$$

You might be asking where a formula like this comes from. The answer can be found in the inverse transpose $$-T.$$ If the matrix $$U_i$$ was actually orthogonal, then $$U_i^{-T} = U_i$$ and thus $$U_{i+1} = U_i.$$ In fact, this last equation is *only* true if $$U_i$$ is orthogonal, so orthogonal matrices are the only *fixed points* for this iteration. Without this property, we would have no hope of this algorithm ever computing an orthogonal matrix. Now, we have two things left to show. The first is that $$U_{i+1}$$ must always be "more orthogonal" than $$U_i$$ and the second is that the $$U_i$$'s must be converging to $$U$$, the orthogonal term from the decomposition.

Both of these facts follow from the singular value decomposition of $$A$$, namely $$A = WDV^T$$ for $$W$$ and $$V$$ orthogonal and $$D$$ diagonal and nonnegative. One can show that the matrix $$U = WV^T$$, or in particular that $$U$$ can be obtained from the SVD by setting $$D = I$$ the identity matrix. Note, however, that $$-T$$ applied to the SVD yields

$$
(WDV^T)^{-T} = WD^{-1}V^T.
$$

So, the inverse-transpose just inverts the diagonal part of the SVD, leaving the rest of the SVD alone. Thus the first step of our algorithm can be rewritten

$$
U_1 = W\frac{D + D^{-1}}{2} V^T.
$$

Note that the singular vectors of $$U_1$$ are the same as those of $$A.$$ Thus, this iteration leaves the singular vectors alone and only changes the singular values of the matrix.

So, to study the algorithm, we need only consider what is happening to $$D.$$ If we look at any one diagonal element, call it $$x$$, and apply our iteration, we get the update

$$
x := \frac{x + \frac{1}{x}}{2}.
$$

One can show that this resulting value will always be closer to $$1$$ than the original value of $$x$$, and thus repeated application of our iteration will force the diagonal matrix to get closer and closer to the identity. We simply terminate our iteration when applying it doesn't change our matrix very much.

I want to stress two important things. The first is that we never had to compute the SVD in order to do this. The SVD is expensive to compute and tedious to implement but this method never actually needed it. We only relied on the SVD to study the algorithm. This is one reason why I think learning higher level mathematics can be extremely useful even if you're just interested in algorithm development. Even if you don't need to compute something like the SVD, it can still be a powerful tool for showing how and why your method works. The second thing is just how cool this really is. We essentially found some equation that the solution had to obey and that *immediately* gave us an algorithm.

Well, I say immediately, but that's not quite true. We had to show three things about our equation: that orthogonal matrices are fixed, nonorthogonal matrices get more orthogonal, and the singular vectors are unchanged by the process. In dynamical systems, the first two properties describe a concept called a stable fixed point. Think about it like a stiff spring. The spring is very happy to be coiled up in its lowest energy state --- called its equilibrium point. If you try to pull the spring, it will resist that force and try to return to equilibrium. Similarly, our equation is perfectly happy if you input an orthogonal matrix, but if you input a nonorthogonal matrix, it will try to "pull it back" to being orthogonal. The third property is important as it tells us that as long as we start with $$A$$ as our intitial guess, then we must get not just any orthogonal matrix, but specifically the orthogonal portion of the polar decomposition!

This idea of taking some algebraic equation and turning it into an algorithm pops up in some other interesting places and I encourage you to try to find some of them for yourself!