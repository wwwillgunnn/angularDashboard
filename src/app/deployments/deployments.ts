import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import Globe from 'three-globe';
import { OrbitControls } from 'three-orbitcontrols-ts';

@Component({
  selector: 'app-deployments',
  standalone: true,
  templateUrl: './deployments.html', // or you can use inline template
  styleUrls: ['./deployments.css'],
})
export class Deployments implements AfterViewInit {
  @ViewChild('globeContainer', { static: true }) globeContainer!: ElementRef<HTMLDivElement>;

  // Example locations for your dots (lat/lng)
  locationsArray = [
    { lat: -33.8688, lng: 151.2093 }, // Sydney
    { lat: 40.7128, lng: -74.006 }, // NYC
    { lat: 35.6895, lng: 139.6917 }, // Tokyo
    { lat: -37.8136, lng: 144.9631 }, // Melbourne
  ];

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    import('three-globe').then(({ default: Globe }) => {
      const container = this.globeContainer.nativeElement;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000,
      );

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 3, 5);
      scene.add(directionalLight);

      const globe = new Globe()
        .globeImageUrl('')
        .backgroundImageUrl('')
        .pointsData(this.locationsArray)
        .pointAltitude(0.5)
        .pointColor(() => 'white')
        .pointRadius(0.5);

      scene.add(globe);

      camera.position.z = 200;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = true;
      controls.enablePan = false;

      const animate = () => {
        requestAnimationFrame(animate);
        globe.rotateY(0.001);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();
    });
  }
}
